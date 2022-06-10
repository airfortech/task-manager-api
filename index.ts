import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import { handleError, CustomError } from "./utils/errors";
import { tasksRoutes } from "./routes/tasks";

const app = express();

app.use(cors());
app.use(json());

app.use("/api/task", tasksRoutes);

app.get("*", async (req, res) => {
  throw new CustomError("Not found.", 404);
});

app.use(handleError);

app.listen(3001, () => {
  console.log("Server started...");
});