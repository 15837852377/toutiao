import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login/index"),
  },
  {
    path: "/",
    component: () => import("@/views/Layout"),
    children: [
      {
        path: "my",
        component: () => import("@/views/my"),
      },
      {
        path: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "qa",
        component: () => import("@/views/qa"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
