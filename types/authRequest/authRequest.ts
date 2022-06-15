import { Request } from "express";
import { UserLogin } from "../user";

export interface authRequest extends Request {
  user: UserLogin;
}
