import { Request, Response } from "express";
import { User } from "../db/records/User.record";
import { pool } from "../db/db";
import { CustomError } from "../utils/errors";
import { User as UserTypes, UserLogin } from "../types/user";
import { FieldPacket } from "mysql2";
import { outdatedTokens } from "..";

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
  const userData: UserTypes = req.body;
  if (!userData.login || !userData.password)
    throw new CustomError("Login and password cant be empty", 401);

  const [users] = (await pool.execute(
    "SELECT * FROM `users` WHERE `login`=:login",
    {
      login: req.body.login,
    }
  )) as [UserTypes[], FieldPacket[]];

  if (!users[0]) throw new CustomError("Such login doesnt exists", 401);

  const user = users[0];
  const isPasswordValid = await User.comparePassword(
    userData.password,
    user.password
  );
  if (!isPasswordValid) throw new CustomError("Wrong Password", 401);

  const payload = {
    id: user.id,
    login: user.login,
    isAdmin: user.isAdmin,
  };
  const token = User.createToken(payload, "1h");

  res.json({ token });
};

export const logout = async (req: Request, res: Response) => {
  console.log("logout");
  const token = req.headers.authorization.split(" ")[1];
  if (token && outdatedTokens.indexOf(token) === -1) outdatedTokens.push(token);

  // change res
  res.status(302).json({ tokens: outdatedTokens });
};
