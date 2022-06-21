import axios from "axios";
import store from "@/store";

export default {
  _401interceptor: null,

  setHeader(accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  },

  post(url, data = null) {
    return axios.post(url, data);
  },

  mount401Interceptor() {
    this._401interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(`Intercept ${error.request.status} in api.service`);
        if (error.request.status === 401) {
          store.dispatch("logout");
        }
        throw error;
      }
    );
  },

  unmount401Interceptor() {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor);
  },
};
