import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/taiwind.css";
import "./assets/css/base.css";
import importElementUi from "./assets/js/elementUi"; //饿了么组件库
import router from "./router";
import "element-plus/lib/theme-chalk/index.css";

const app = createApp(App);
app.use(router);
importElementUi(app);
app.mount("#app");
