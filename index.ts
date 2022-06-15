import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import { handleError, CustomError } from "./utils/errors";
import { tasksRoutes } from "./routes/tasks";
import { usersRoutes } from "./routes/users";
import { isAuth } from "./middlewares/isAuth";

const app = express();

export const outdatedTokens: string[] = [];

app.use(cors());
app.use(json());

app.use("/api/task", isAuth, tasksRoutes);
app.use("/api/user", usersRoutes);

app.get("*", async (req, res) => {
  throw new CustomError("Not found.", 404);
});

app.use(handleError);

app.listen(3001, () => {
  console.log("Server started...");
});
