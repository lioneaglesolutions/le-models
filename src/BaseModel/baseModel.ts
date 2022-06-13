import { Builder } from "@/Builder";
import { kebab } from "@/utils/string";
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

export type ModelRelations<M extends BaseModel = BaseModel> = {
  [K in keyof Partial<M>]: M[K];
};

export class BaseModel<ModelData extends BaseModelDataId | BaseModelDataUuid = BaseModelDataUuid> {
  constructor(public data: ModelData = {} as ModelData) {}

  readonly primaryKeyName: string = "uuid";

  readonly slug?: string;

  readonly relations?: ModelRelations;

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

  hasOne() {
    //
  }
}
