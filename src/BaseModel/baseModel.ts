export type BaseModelDataId<PK extends string = "id"> = Record<PK, number> & {
  [key: string]: unknown;
};

export type BaseModelDataUuid<PK extends string = "uuid"> = Record<PK, string> & {
  [key: string]: unknown;
};

export class BaseModel<ModelData extends BaseModelDataId | BaseModelDataUuid = BaseModelDataUuid> {
  constructor(public data: ModelData = {} as ModelData) {}

  readonly primaryKeyName: string = "uuid";

  get primaryKey(): string | number {
    return this.data[this.primaryKeyName] as string | number;
  }
}
