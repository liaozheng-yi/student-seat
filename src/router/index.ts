import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
  { path: "/", component: () => import("@/views/login.vue") },
  { path: "/seating", component: () => import("@/views/seating.vue") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from, failure) => {
  NProgress.done();
});

export default router;
