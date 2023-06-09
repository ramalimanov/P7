import Vue from "vue";
import Router from "vue-router";
import Signin from "./Signin";
import Signup from "./Signup";
import Home from "./Home";
import Post from "./Post";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home",
    },
    {
      path: "/post/:id",
      component: Post,
      name: "Post",
    },
    {
      path: "/signin",
      component: Signin,
      name: "Signin",
    },
    {
      path: "/signup",
      component: Signup,
      name: "Signup",
    },
  ],
  mode: "history",
});

export default router;
