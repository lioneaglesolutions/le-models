import { BaseModel } from "@/BaseModel";

type BookData = {
  uuid: string;
  name: string;
};

export class Book extends BaseModel<BookData> {}
