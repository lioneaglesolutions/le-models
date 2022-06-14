import { BaseModel, EagerRelations } from "@/BaseModel/baseModel";
import { Book, BookData } from "./Book";

export type UserData = {
  uuid: string;
  book: BookData;
};

export class User extends BaseModel<UserData> {
  eagerRelations(): EagerRelations<User> {
    return {
      book: this.hasOne(Book),
    };
  }
}
