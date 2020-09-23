import { User } from "./entity/User";

export type Lazy<T> = T | Promise<T>;

export type Context = {
  user: User;
};
