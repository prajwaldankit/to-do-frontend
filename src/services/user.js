import { post } from "./http";

export function registerUser(data) {
  return post("/users/register", data);
}

export function loginUser(data) {
  return post("/users/login", data);
}
