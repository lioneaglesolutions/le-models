import { Builder } from "@/Builder";
import { kebab, camel } from "@/utils/string";
import pluralize from "pluralize";

export type Relation<T> = T;

export type BaseModelData = {
  [key: string]: unknown;
};

export interface MetaBaseModel<M extends BaseModel, D> {
  new (data: D): M;
  builder<M extends BaseModel, Data = NonNullable<M["data"]>>(this: MetaBaseModel<M, Data>): Builder<M, D>;
}

export type ModelRelations<T extends BaseModel> = {
  [K in keyof ReturnType<T["eagerRelations"]>]: ReturnType<T["eagerRelations"]>[K];
};

export type EagerRelations<T extends BaseModel> = {
  [K in keyof T["eagerRelations"]]: T["eagerRelations"][K];
};

export type NonnullableHasOneConfig<D> = {
  key?: keyof D;
  loadRelations?: boolean;
  nullable: false;
};

export type NullableHasOneConfig<D> = {
  key?: keyof D;
  loadRelations?: boolean;
  nullable: true;
};

export type ConstructorOptions = {
  // relations?: boolean;
  // loadedRelations?: string[];
};

export type HasOneConfig<D> = NonnullableHasOneConfig<D> | NullableHasOneConfig<D>;

export type HasOneReturn<Config, Data, Model> = Config extends NonnullableHasOneConfig<Data>
  ? Model
  : Config extends NullableHasOneConfig<Data>
  ? Model | null
  : never;

export class BaseModel<ModelData extends BaseModelData = BaseModelData> {
  constructor(public data: ModelData = {} as ModelData) {
    this.setRelations();
  }

  readonly primaryKeyName: string = "uuid";

  readonly slugOverride?: string;

  readonly relations: ModelRelations<this> = {} as ModelRelations<this>;

  get primaryKey(): string | number {
    return this.data[this.primaryKeyName] as string | number;
  }

  builder<M extends BaseModel, D = M["data"]>(this: M): Builder<M, D> {
    return new Builder(this, this.constructor as MetaBaseModel<M, D>);
  }

  getSlug(): string {
    return this.slugOverride ?? kebab(this.constructor.name).toLowerCase();
  }

  getPluralSlug(): string {
    return pluralize(this.getSlug());
  }

  resourceSlug(): string {
    return this.getPluralSlug() + "/" + this.primaryKey;
  }

  eagerRelations() {
    return {};
  }

  getRelationKey(): string {
    return camel(this.getSlug());
  }

  setRelations(): void {
    for (const [key, value] of Object.entries(this.eagerRelations())) {
      Object.assign(this.relations, {
        [key]: value,
      });
    }
  }

  hasOne<C extends HasOneConfig<ModelData>, M extends BaseModel, D = M["data"]>(
    type: new (data?: D, options?: ConstructorOptions) => M,
    config = {
      nullable: false,
    } as C
  ): HasOneReturn<C, ModelData, M> {
    const slug = config?.key ?? new type().getRelationKey();
    const data = this.data[slug] as D;

    if (!data) {
      return null as HasOneReturn<C, ModelData, M>;
    }

    const relation = new type(data);

    return relation as HasOneReturn<C, ModelData, M>;
  }
}
