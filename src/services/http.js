import axios from "./../config/axios";

export function get(url) {
  return axios({
    method: "get",
    url: url,
    headers: getRequestHeader()
  });
}

export function post(url, data) {
  return axios({
    method: "post",
    url: url,
    data: data,
    headers: getRequestHeader() || {}
  });
}

export function patch(url, item) {
  return axios({
    method: "patch",
    url: url + item._id,
    headers: getRequestHeader(),
    data: item
  });
}

export function remove(url, item) {
  return axios({
    method: "delete",
    url: url + item._id,
    headers: getRequestHeader()
  });
}

function getRequestHeader() {
  return {
    authorization: `Bearer ${localStorage.getItem("authorization")}`
  };
}
