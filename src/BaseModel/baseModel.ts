import { Builder } from "@/Builder";
import { kebab, camel } from "@/utils/string";
import pluralize from "pluralize";

export type BaseModelDataId<PK extends string = "id"> = Record<PK, number> & {
  [key: string]: unknown;
};

export type BaseModelDataUuid<PK extends string = "uuid"> = Record<PK, string> & {
  [key: string]: unknown;
};

export interface MetaBaseModel<M extends BaseModel, D> {
  new (data: D): M;
  builder<M extends BaseModel, Data = NonNullable<M["data"]>>(this: MetaBaseModel<M, Data>): Builder<M, D>;
}

export type ModelRelations<M extends BaseModel> = {
  [K in keyof Partial<M>]: M[K];
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

export class BaseModel<ModelData extends BaseModelDataId | BaseModelDataUuid = BaseModelDataUuid> {
  constructor(public data: ModelData = {} as ModelData) {}

  readonly primaryKeyName: string = "uuid";

  readonly slug?: string;

  readonly relations?: ModelRelations<BaseModel>;

  get primaryKey(): string | number {
    return this.data[this.primaryKeyName] as string | number;
  }

  builder<M extends BaseModel, D = M["data"]>(this: M): Builder<M, D> {
    return new Builder(this, this.constructor as MetaBaseModel<M, D>);
  }

  getSlug(): string {
    return this.slug ?? kebab(this.constructor.name).toLowerCase();
  }

  getPluralSlug(): string {
    return pluralize(this.getSlug());
  }

  resourceSlug(): string {
    return this.getPluralSlug() + "/" + this.primaryKey;
  }

  getRelationKey(): string {
    return camel(this.getSlug());
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

    // relation.setParent(this);
    return relation as HasOneReturn<C, ModelData, M>;
  }
}
