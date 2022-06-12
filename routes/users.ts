import { Router } from "express";
import { login, logout, signup } from "../controllers/usersController";

export const usersRoutes = Router()
  .get("/login", login) // all
  .get("/logout", logout) // one
  .get("/signup", signup); // create
