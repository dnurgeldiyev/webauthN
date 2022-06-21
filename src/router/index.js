import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login.vue";
import HomeView from '../views/HomeView.vue'
import store from "../store/index.js";

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      anonymous: true,
    },
  },

]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => !record.meta.anonymous)) {
    const authState = store.getters.getAuthState;
    if (authState === "authenticated") {
      next();
      return;
    }
    next({ name: "login", query: { redir: to.fullPath } });
  } else {
    next();
  }
});


export default router
