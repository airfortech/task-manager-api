import { NewTask, Task as TaskTypes } from "../../types";
import { CustomError } from "../../utils/errors";
import { v4 as uuid } from "uuid";

export class Task implements TaskTypes {
  id: string;
  title: string;
  description: string;
  userId: string;

  constructor({ id, title, description, userId }: TaskTypes) {
    if (!title || title.length > 50)
      throw new CustomError(
        "Title cant be empty and have more than 50 characters",
        400
      );
    if (!description || description.length > 250)
      throw new CustomError(
        "Description cant be empty and have more than 250 characters",
        400
      );
    if (userId.length !== 36)
      throw new CustomError("UserID must have 36 characters", 400);

    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
  }

  public createId(): void {
    if (!this.id) this.id = uuid();
  }
}
