import { createApp } from "vue";
import { createGlobalSettings } from "./components";
import { state, stateSymbol } from "./state";
import App from "./views/App.vue";

createApp(App)
  .use(createGlobalSettings())
  .provide(stateSymbol, state)
  .mount("#app");
