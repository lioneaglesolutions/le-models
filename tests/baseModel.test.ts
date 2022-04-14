import { BaseModel } from "../src/BaseModel/baseModel";

describe("base model", () => {
  it("can instantiate a base model", () => {
    const model = new BaseModel();

    expect(model).toBeInstanceOf(BaseModel);
  });
});
