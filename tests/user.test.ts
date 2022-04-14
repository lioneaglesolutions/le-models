import { UserUuid } from "./fixtures/UserUuid";
import { User } from "./fixtures/User";

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
