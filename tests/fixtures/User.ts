import { BaseModel, ModelRelations } from "@/BaseModel/baseModel";

type BookData = {
  uuid: string;
  name: string;
};

class Book extends BaseModel<BookData> {}

type UserData = {
  uuid: string;
  book: BookData;
};

export class User extends BaseModel<UserData> {
  eagerRelations() {
    return {
      book: this.hasOne(Book),
    };
  }
}
