import { Builder } from "@/Builder";
import { BaseModel } from "../../src/BaseModel/baseModel";

describe("base model", () => {
  it("can instantiate a base model", () => {
    const model = new BaseModel();

    expect(model).toBeInstanceOf(BaseModel);
  });

  it("returns new builder instance", () => {
    const model = new BaseModel();

    const builder = model.builder();

    expect(builder).toBeInstanceOf(Builder);
  });
});
