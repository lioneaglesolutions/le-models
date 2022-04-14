import { UserUuid } from "../fixtures/UserUuid";
import { User } from "../fixtures/User";
import { BaseModel } from "@/BaseModel";

it("can instantiate a user", () => {
  const user = new User();

  expect(user).toBeInstanceOf(User);
});

it("can get primary key", () => {
  const user = new User({ id: 2 });

  expect(user.primaryKey).toBe(2);
});

it("can get id", () => {
  const user = new User({ id: 2 });

  expect(user.data.id).toBe(2);
});

it("can get uuid", () => {
  const user = new UserUuid({ uuid: "1234" });

  expect(user.data.uuid).toBe("1234");
});

it("can get the slug", () => {
  const user = new User();

  expect(user.getSlug()).toBe("user");
});

it("can get the slug for multi-word model", () => {
  class SomeUser extends BaseModel {}
  const user = new SomeUser();

  expect(user.getSlug()).toBe("some-user");
});

it("can override the slug", () => {
  class User extends BaseModel {
    slug = "override";
  }

  const user = new User();

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
  const user = new User({ id: 5 });

  expect(user.resourceSlug()).toBe("users/5");
});
