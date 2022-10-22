import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import Alert from "@/components/Alert.vue";

import App from "./App.vue";
import router from "./router";

import "./assets/css/style.scss";

const app = createApp(App);

app.component("Alert", Alert);

app.use(router).use(createPinia().use(piniaPluginPersistedState)).mount("#app");
