import { NextFunction, Request, Response } from "express";
import { User } from "../db/records/User.record";
import { UserLogin, authRequest } from "../types";
import { CustomError } from "../utils/errors";

export const isAuth = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("isAuth...");
  const token = req.headers.authorization;
  if (!token) throw new CustomError("You have no permission to access", 403);
  console.log(token);

  const userData = User.verifyToken(token.split(" ")[1]);
  console.log(userData);
  req.user = userData as UserLogin;
  next();
};
