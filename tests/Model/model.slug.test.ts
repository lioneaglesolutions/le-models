import { BaseModel } from "@/BaseModel/baseModel";

describe("model slug", () => {
  it("can get the slug", () => {
    const user = new (class User extends BaseModel {})();

    expect(user.getSlug()).toBe("user");
  });

  it("can get the slug for multi-word model", () => {
    const user = new (class SomeUser extends BaseModel {})();

    expect(user.getSlug()).toBe("some-user");
  });

  it("can override the slug", () => {
    const user = new (class User extends BaseModel {
      slug = "override";
    })();

    expect(user.getSlug()).toBe("override");
  });

  it("can get the plural slug", () => {
    const models = [
      {
        model: class SomeUser extends BaseModel {},
        slug: "some-users",
      },
      {
        model: class Fish extends BaseModel {},
        slug: "fish",
      },
      {
        model: class Bus extends BaseModel {},
        slug: "buses",
      },
      {
        model: class Class extends BaseModel {},
        slug: "classes",
      },
      {
        model: class Child extends BaseModel {},
        slug: "children",
      },
    ];

    models.forEach((item) => {
      expect(new item.model().getPluralSlug()).toBe(item.slug);
    });
  });

  it("can get the resource slug", () => {
    const user = new (class User extends BaseModel {})({ uuid: "12345" });

    expect(user.resourceSlug()).toBe("users/12345");
  });
});
