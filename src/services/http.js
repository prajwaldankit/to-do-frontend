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
    url: url,
    headers: getRequestHeader(),
    data: item
  });
}

export function put(url, item) {
  return axios({
    method: "put",
    url: url,
    headers: getRequestHeader(),
    data: item
  });
}

export function remove(url, item) {
  console.log("delete url", url + item._id);
  return axios({
    method: "delete",
    url: url + item._id,
    headers: getRequestHeader()
  });
}

function getAccessToken() {
  if (localStorage.getItem("accessToken")) {
    return `Bearer ${localStorage.getItem("accessToken")}`;
  } else {
    return null;
  }
}

function getRefreshToken() {
  if (localStorage.getItem("refreshToken")) {
    return `Bearer ${localStorage.getItem("refreshToken")}`;
  } else {
    return null;
  }
}

function getRequestHeader() {
  if (localStorage.getItem("accessToken")) {
    return {
      authorization: getAccessToken()
    };
  } else {
    return null;
  }
}

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
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
          console.log("response from token", res);
          localStorage.setItem("accessToken", res.data.token);
          localStorage.setItem("refreshToken", res.data.tokenRefresh);
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
