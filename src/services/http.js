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
    authorization: `Bearer ${localStorage.getItem("x-token")}`
  };
}

function getRefreshToken() {
  return `Bearer ${localStorage.getItem("x-tokenRefresh")}`;
}

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "TokenExpired"
    ) {
      if (!getRefreshToken()) {
        return Promise.reject(error);
      }
      return axios({
        method: "POST",
        url: "/users/tokens",
        data: {
          refreshToken: getRefreshToken(),
          info: "withRefresh"
        },
        headers: getRequestHeader()
      })
        .then(res => {
          localStorage.setItem("x-token", res.data.tokens.token);
          localStorage.setItem("x-tokenRefresh", res.data.tokens.tokenRefresh);
          error.config.headers = getRequestHeader();
          return axios(error.config);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);
