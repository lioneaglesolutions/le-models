import { BaseModel } from "@/BaseModel";
import { Query } from "@/Query/query";

export class Builder<M extends BaseModel, D = M["data"]> {
  constructor(public model: M, public modelConstructor: new (data: D) => M, public query = new Query()) {
    this.model = model;
    this.modelConstructor = modelConstructor;
  }
}
