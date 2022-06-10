import { Router } from "express";
import {
  test,
  getAllTasks,
  getTask,
  createNewTask,
  deleteTask,
  updateTask,
} from "../controllers/tasksController";

export const tasksRoutes = Router()
  .get("/", getAllTasks) // all
  .get("/:id", getTask) // one
  .post("/", createNewTask) // create
  .delete("/:id", deleteTask) // delete
  .patch("/:id", updateTask); // update
