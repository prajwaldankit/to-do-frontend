import { post, get } from "./http";

export function registerUser(data) {
  return post("/users/register", data);
}

export function loginUser(data) {
  return post("/users/login", data);
}

export function getUserData() {
  return get("/users/user");
}

export function getProfileImage(user) {
  if (user._id) return `http://localhost:8000/static/${user._id}.jpeg`;
  return null;
}

export function getUsers() {
  return get("/users/users");
}
