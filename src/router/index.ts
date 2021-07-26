import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [{ path: "/", component: () => import("@/views/login.vue") }];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
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
