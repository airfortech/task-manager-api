import { User as UserTypes, UserLogin } from "../../types/user";
import { CustomError } from "../../utils/errors";
import { v4 as uuid } from "uuid";
import { hash, compare } from "bcrypt";
import { pool } from "../db";
import { FieldPacket } from "mysql2";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../../config/config";
import { outdatedTokens } from "../..";

export class User implements UserTypes {
  id: string;
  login: string;
  password: string;
  // email: string | any;
  email: string;
  isAdmin: boolean;

  constructor({ id, login, password, email, isAdmin = false }: UserTypes) {
    if (!login || login.length > 15)
      throw new CustomError(
        "Login cant be empty and have more than 15 characters",
        401
      );
    if (!password || password.length < 5 || password.length > 20)
      throw new CustomError(
        "Password must have more than 5 and max 20 characters",
        401
      );
    if (!email) throw new CustomError("Email cant be empty", 401);
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const regex = pattern.test(email.toLowerCase());
    if (!regex) throw new CustomError("Incorect email", 401);

    this.id = id;
    this.login = login;
    this.password = password;
    this.email = email;
    this.isAdmin = isAdmin;
  }

  public createId(): void {
    if (!this.id) this.id = uuid();
  }

  public async validate(): Promise<void> {
    const [logins] = (await pool.execute(
      "SELECT `login` FROM `users` WHERE `login`=:login",
      {
        login: this.login,
      }
    )) as [UserTypes[], FieldPacket[]];
    if (logins.length > 0)
      throw new CustomError("Login exists. Choose other login.", 401);

    const [emails] = (await pool.execute(
      "SELECT `email` FROM `users` WHERE `email`=:email",
      {
        email: this.email,
      }
    )) as [UserTypes[], FieldPacket[]];
    if (emails.length > 0)
      throw new CustomError("Email exists. Choose other emial.", 401);
  }

  public async hashPassword(): Promise<void> {
    const password = await hash(this.password, 10);
    this.password = password;
  }

  static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await compare(password, hash);
  }

  static createToken(user: UserLogin, time: string | number): string {
    const payload = {
      id: user.id,
      login: user.login,
      isAdmin: user.isAdmin,
    };
    return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: time });
  }

  static verifyToken(token: string) {
    try {
      if (outdatedTokens.indexOf(token) > -1) throw new Error();
      const userData = jwt.verify(token, ACCESS_TOKEN);
      return userData;
    } catch (error) {
      throw new CustomError("You have no permission to access", 403);
    }
  }
}
