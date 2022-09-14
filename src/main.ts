import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "./assets/css/style.scss";

createApp(App).use(router).use(createPinia().use(piniaPluginPersistedState)).mount("#app");
