import { Builder } from "@/Builder";
import { BaseModel } from "@/BaseModel/baseModel";

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

  it("can instantiate a user", () => {
    class User extends BaseModel<{ id: number }> {}
    const user = new User();

    expect(user).toBeInstanceOf(User);
  });

  it("can get primary key", () => {
    class User extends BaseModel<{ id: number }> {
      primaryKeyName = "id";
    }

    const user = new User({ id: 2 });

    expect(user.primaryKey).toBe(2);
  });

  it("can get id", () => {
    class User extends BaseModel<{ id: number }> {}

    const user = new User({ id: 2 });

    expect(user.data.id).toBe(2);
  });

  it("can get uuid", () => {
    class UserUuid extends BaseModel {
      readonly primaryKeyName: string = "uuid";
    }

    const user = new UserUuid({ uuid: "1234" });

    expect(user.data.uuid).toBe("1234");
  });
});
