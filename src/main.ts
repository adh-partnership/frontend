import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import Alert from "@/components/Alert.vue";
import AuthLink from "@/components/AuthLink.vue";

import App from "./App.vue";
import router from "./router";

import "./assets/css/style.scss";
import "flowbite";

const app = createApp(App);

app.component("Alert", Alert);
app.component("AuthLink", AuthLink);

app.use(router).use(createPinia().use(piniaPluginPersistedState)).mount("#app");
