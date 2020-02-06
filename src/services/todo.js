import { get, patch, remove, post } from "./http";

export function getToDoList() {
  return get("/api/todos");
}

export function addToDoItem(item) {
  return post("api/todos", item);
}

export function editToDoItem(item) {
  return patch("/api/todos/", item);
}

export function removeToDoItem(item) {
  return remove("/api/todos/", item);
}
