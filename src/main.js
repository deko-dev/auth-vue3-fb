import { createApp } from "vue";
import "./style.scss";
import "./assets/fonts/Fonts.scss";
import App from "./App.vue";
import router from "./router/routes";

import { app } from "./firebaseConfig";


createApp(App).use(router).mount("#app");
