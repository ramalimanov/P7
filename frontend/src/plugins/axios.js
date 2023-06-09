// Using axios making comminication with backend
import Vue from "vue";
import axios from "axios";
import { store } from "../store/store";

const guest = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:3000/api/auth",
});

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch("logout");
    } else {
      return Promise.reject(error);
    }
  }
);

Vue.prototype.$guest = guest;
Vue.prototype.$api = api;

export { guest, api };
