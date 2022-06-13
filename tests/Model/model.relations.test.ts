import { BaseModel } from "@/BaseModel/baseModel";

type BookData = {
  uuid: string;
  name: string;
};

class Book extends BaseModel<BookData> {}

type UserData = {
  uuid: string;
  book: BookData;
};

class User extends BaseModel<UserData> {
  eagerRelations() {
    return {
      book: this.hasOne(Book, { nullable: false }),
    };
  }
}

describe("model relations", () => {
  it("can set a relation from data", () => {
    const user = new User({
      uuid: "111",
      book: {
        uuid: "222",
        name: "book name",
      },
    });

    expect(user.relations.book.primaryKey).toBe("222");
  });
});
