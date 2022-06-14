import { BaseModel, EagerRelations } from "@/BaseModel";
import { User, UserData } from "./User";

export type BookData = {
  uuid: string;
  name: string;
  user: UserData;
};

export class Book extends BaseModel<BookData> {
  eagerRelations(): EagerRelations<Book> {
    return {
      user: this.hasOne(User),
    };
  }
}
