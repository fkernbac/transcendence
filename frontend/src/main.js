// vue main.js

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/global-style.css";
import { createI18n } from "vue-i18n";

// import language file
import en from "./lang/en.js";
import de from "./lang/de.js";
import it from "./lang/it.js";

// language plugin
const i18n = new createI18n({
  locale: localStorage.getItem("userLanguage") || "en", // default language
  messages: {
    en,
    de,
    it,
  },
});

createApp(App).use(router).use(i18n).mount("#app");
