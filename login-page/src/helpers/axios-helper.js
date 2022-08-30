
const axios = require("axios")

const buildHeaders = () => {
  let token = localStorage.getItem("token")

  if (!token) {
    console.log("ok");
  } else{
    console.log("no");
  }
}

axios.interceptors.request.use(function (config) {
  config.headers = buildHeaders()
  return config
}, function (error) {
  console.error(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  response.headers = buildHeaders()
  return response
}, function (error) {
  console.error(error)

  if (error.response.data) {
    toastr.error(error.response.data.error)
  }
  return Promise.reject(error)
})

const baseUrl = 'http://localhost:8080'

function get(url) {
  return axios.get(baseUrl + url)
};

function post(url, data) {
  return axios.post(baseUrl + url, data)
};

function put(url, data) {
  return axios.put(baseUrl + url, data)
};

function _delete(url, data) {
  return axios.delete(baseUrl + url, data)
};

function patch(url, data) {
  return axios.patch(baseUrl + url, data)
};

function options(url, data) {
  return axios.options(baseUrl + url, data)
};

export default {
  get: get,
  post: post,
  put: put,
  delete: _delete,
  patch: patch,
  options: options
}
