import { Request, Response } from "express";
import { User } from "../db/records/User.record";
import { pool } from "../db/db";
import { CustomError } from "../utils/errors";

export const signup = async (req: Request, res: Response) => {
  console.log("signup");
  const user = new User(req.body);
  user.createId();
  await user.validate();
  await user.hashPassword();
  await pool.execute(
    "INSERT INTO `users`(`id`, `login`, `password`, `email`, `isAdmin`) VALUES(:id, :login, :password, :email, :isAdmin)",
    user
  );

  res.json({
    user: {
      id: user.id,
      login: user.login,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  console.log("login");
  res.json({ login: "ok" });
};

export const logout = async (req: Request, res: Response) => {
  console.log("logout");
  res.json({ logout: "ok" });
};
