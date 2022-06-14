export interface NewUser extends Omit<User, "id"> {
  id?: string;
}

export interface UserLogin extends Omit<User, "id" | "email" | "isAdmin"> {}

export interface User {
  id: string;
  login: string;
  password: string;
  email: string;
  isAdmin: boolean;
}
