import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import Alert from "@/components/Alert.vue";
import AuthLink from "@/components/AuthLink.vue";
import { SetupCalendar } from "v-calendar";

import App from "./App.vue";
import router from "./router";

import "./assets/css/style.scss";
import "v-calendar/dist/style.css";

const app = createApp(App);

app.component("Alert", Alert);
app.component("AuthLink", AuthLink);

app.use(router).use(createPinia().use(piniaPluginPersistedState)).use(SetupCalendar, {}).mount("#app");
