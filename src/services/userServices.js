import { post, get } from "./http";

export function registerUser(data) {
  return post("/users/register", data);
}

export function loginUser(data) {
  return post("/users/login", data);
}

export function getUserData(user) {
  console.log("user in user services", user);
  return get(`/users/${user._id}`);
}

export function getUsers() {
  return get("/users/users");
}
