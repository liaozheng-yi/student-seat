import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/taiwind.css";
import "./assets/css/base.css";
import router from "./router";
import { ElRadio } from "element-plus";
import 'element-plus/lib/theme-chalk/index.css'

createApp(App).use(router).use(ElRadio).mount("#app");
