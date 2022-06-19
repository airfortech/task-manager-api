import { Response } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { pool } from "../db/db";
import { Task } from "../db/records/Task.record";
import { authRequest, Task as TaskTypes } from "../types/";
import { CustomError } from "../utils/errors";

export const getAllTasks = async (req: authRequest, res: Response) => {
  const { id, isAdmin } = req.user;
  let query = "SELECT * FROM `tasks` WHERE `userId`=:id";
  if (isAdmin) query = "SELECT * FROM `tasks`";

  const [tasks] = (await pool.execute(query, {
    id,
  })) as [TaskTypes[], FieldPacket[]];

  res.json({ tasks });
};

export const getTask = async (req: authRequest, res: Response) => {
  const { id, isAdmin } = req.user;
  const taskId = req.params.id;
  let query = "SELECT * FROM `tasks` WHERE `id`=:taskId AND `userID`=:id";
  if (isAdmin) query = "SELECT * FROM `tasks` WHERE `id`=:taskId";

  const [tasks] = (await pool.execute(query, {
    taskId,
    id,
  })) as [TaskTypes[], FieldPacket[]];
  const task = tasks[0] || null;

  res.json({ task });
};

export const createNewTask = async (req: authRequest, res: Response) => {
  const userId = req.user.id;
  const newTask = new Task({ ...req.body, userId });
  newTask.createId();

  await pool.execute(
    "INSERT INTO `tasks`(`id`, `title`, `description`, `userId`) VALUES(:id, :title, :description, :userId)",
    newTask
  );

  res.status(201).json({ task: newTask });
};

export const deleteTask = async (req: authRequest, res: Response) => {
  const { id: userId, isAdmin } = req.user;
  const id = req.params.id;
  let query = "DELETE FROM `tasks` WHERE `id`=:id AND `userId`=:userId";
  if (isAdmin) query = "DELETE FROM `tasks` WHERE `id`=:id";

  const [deletedTask] = (await pool.execute(query, {
    id,
    userId,
  })) as [ResultSetHeader, FieldPacket[]];

  deletedTask.affectedRows
    ? res.json({ success: true })
    : res.json({ success: false });
};

export const updateTask = async (req: authRequest, res: Response) => {
  const { id: userId, isAdmin } = req.user;
  const id = req.params.id;
  let query = "SELECT * FROM `tasks` WHERE `id`=:id AND `userId`=:userId";
  if (isAdmin) query = "SELECT * FROM `tasks` WHERE `id`=:id";

  const [tasks] = (await pool.execute(query, {
    id,
    userId,
  })) as [TaskTypes[], FieldPacket[]];

  const task = tasks[0];
  if (task) {
    const updatedTask = new Task({ ...task, ...req.body });
    await pool.execute(
      "UPDATE `tasks` SET `title`=:title, `description`=:description WHERE `id`=:id",
      updatedTask
    );

    res.json({ task: updatedTask });
  } else throw new CustomError("Task not found.", 404);
};
