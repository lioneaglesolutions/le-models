import { BaseModel, ModelRelations } from "@/BaseModel/baseModel";
import { Book } from "./Book";

type UserData = {
  uuid: string;
};

export class User extends BaseModel<UserData> {
  book!: Book | null;

  eagerRelations(): ModelRelations {
    return {
      book: this.hasOne(Book),
    };
  }
}
