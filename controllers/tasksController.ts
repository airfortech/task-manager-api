import { Request, Response } from "express";
import { FieldPacket } from "mysql2";
import { pool } from "../db/db";
import { Task } from "../db/records/Task.record";
import { Task as TaskTypes } from "../types/";
import { CustomError } from "../utils/errors";

export const getAllTasks = async (req: Request, res: Response) => {
  const [tasks] = (await pool.execute("SELECT * FROM `tasks`")) as [
    TaskTypes[],
    FieldPacket[]
  ];
  // add user/admin tasks later
  res.json({ tasks });
  console.log("getAllTasks");
};

export const getTask = async (req: Request, res: Response) => {
  // add user/admin tasks later
  const id = req.params.id;
  const [tasks] = (await pool.execute("SELECT * FROM `tasks` WHERE `id`=?", [
    id,
  ])) as [TaskTypes[], FieldPacket[]];
  const task = tasks[0];
  res.json({ task: task });
  console.log("getTask");
};

export const createNewTask = async (req: Request, res: Response) => {
  // get info of current userId later
  console.log("createNewTask");
  const newTask = new Task({ ...req.body });
  newTask.createId();
  await pool.execute(
    "INSERT INTO `tasks`(`id`, `title`, `description`, `userId`) VALUES(:id, :title, :description, :userId)",
    newTask
  );
  res.status(201).json({ task: newTask });
};

export const deleteTask = async (req: Request, res: Response) => {
  // add user/admin tasks later
  const id = req.params.id;
  console.log("deleteTask: " + id);
  await pool.execute("DELETE FROM `tasks` WHERE `id`=:id", { id });
  res.json({ task: "ok" });
};

export const updateTask = async (req: Request, res: Response) => {
  // add user/admin tasks later
  const id = req.params.id;
  const [tasks] = (await pool.execute("SELECT * FROM `tasks` WHERE `id`=:id", {
    id,
  })) as [TaskTypes[], FieldPacket[]];
  const task = tasks[0];
  console.log(task);
  if (task) {
    const updatedTask = new Task({ ...task, ...req.body });
    await pool.execute(
      "UPDATE `tasks` SET `title`=:title, `description`=:description WHERE `id`=:id",
      updatedTask
    );
    res.json({ task: updatedTask });
  } else throw new CustomError("Task not found.", 404);
};
