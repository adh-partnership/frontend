import { createApp } from "vue";
import { createPinia } from "pinia";

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import App from "./App.vue";
import router from "./router";

import "@materializecss/materialize/sass/materialize.scss";

library.add(faCaretDown);

createApp(App).component("fa-icon", FontAwesomeIcon).use(router).use(createPinia()).mount("#app");
