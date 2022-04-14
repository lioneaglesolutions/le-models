import { BaseModel } from "../../src/BaseModel";

type UserData = {
  id: number;
};

export class User extends BaseModel<UserData> {
  readonly primaryKeyName: string = "id";
}
