import { BaseModel } from "../../src/BaseModel";

type UserData = {
  uuid: string;
};

export class UserUuid extends BaseModel<UserData> {
  readonly primaryKeyName: string = "uuid";
}
