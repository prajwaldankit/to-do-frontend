import { get, patch, remove, post, put } from "./http";

export function getToDoList() {
  return get("/api/todos");
}

export function getSubToDoList(parentId) {
  return get(`/api/todos/${parentId}`);
}

export function addToDoItem(item) {
  return post("api/todos", item);
}

export function addSubToDoItem(parentId, item) {
  return put(`api/todos/${parentId}`, item);
}

export function editSubToDoItem(parentId, item) {
  return patch(`api/todos/${parentId}/${item._id}`, item);
}

export function editToDoItem(item) {
  return patch(`/api/todos/${item._id}`, item);
}

export function removeToDoItem(item) {
  return remove(`/api/todos/`, item);
}

export function removeSubToDoItem(parentId, item) {
  return remove(`/api/todos/${parentId}/`, item);
}
