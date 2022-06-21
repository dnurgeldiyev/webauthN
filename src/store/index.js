import Vue from "vue";
import Vuex from "vuex";
import ApiService from "@/services/api.service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authState: localStorage.getItem("authState") || "unauthenticated",
    userInfoLoadStarted: false,
    userInfo: null,
  },
  getters: {
    getAuthState: (state) => {
      return state.authState;
    },
    isUserInfoLoadStarted: (state) => {
      return state.userInfoLoadStarted;
    },
    getUserInfo: (state) => {
      return state.userInfo;
    },
  },
  mutations: {
    userInfoLoaded(state, body) {
      state.userInfoLoadStarted = false;
      state.authState = "authenticated";
      state.userInfo = body;
      localStorage.setItem("authState", "authenticated");
      // ApiService.mount401Interceptor();
    },
    userInfoLoadReset(state) {
      state.userInfoLoadStarted = false;
      state.authState = "unauthenticated";
      state.userInfo = null;
      localStorage.setItem("authState", "unauthenticated");
      ApiService.unmount401Interceptor();
    },
    userInfoLoadStarted(state) {
      state.userInfoLoadStarted = true;
    },
    userInfoLoadFailed(state) {
      this.userInfoLoadReset(state);
    },
  },
  actions: {
    loadUserInfo(context) {
      return new Promise((resolve, reject) => {
        context.commit("userInfoLoadStarted");
        Vue.http.post("/api/user/me").then(
          (response) => {
            if (response.status === 200) {
              const body = response.body;
              context.commit("userInfoLoaded", body);
              resolve(body);
            }
          },
          (error) => {
            console.log("Vuex.loadUserInfo error received", error);
            context.commit("userInfoLoadReset");
            reject(error);
          }
        );
      });
    },
    login(context, authData) {
      return new Promise((resolve, reject) => {
        Vue.http
          .post(
            "/api/user/login",
            {
              username: authData.username,
              password: authData.password,
            },
            {
              emulateJSON: true,
            }
          )
          .then(
            (response) => {
              console.log("Logged in");
              if (response.status === 200) {
                const body = response.body;
                console.log("login successful");
                context.commit("userInfoLoaded", body.info);
                resolve(body);
              } else {
                context.commit("userInfoLoadFailed");
                reject(response);
              }
            },
            (error) => {
              reject(error);
            }
          );
      });
    },
    logout(context) {
      return new Promise((resolve, reject) => {
        Vue.http.post("/api/user/logout").then(
          (response) => {
            if (response.status === 200) {
              context.commit("userInfoLoadReset");
              const body = response.body;
              resolve(body);
            } else {
              reject(response);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
  },
  modules: {},
});
