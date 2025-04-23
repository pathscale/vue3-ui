import type { App } from "vue";
import Toaster from "./Toaster.vue";
import ToasterPositions from "./defaults/position";
import createToaster from "./toast-api";

Toaster.install = (app: App, options = {}) => {
  const methods = createToaster(options);
  app.config.globalProperties.$toast = methods;
  app.provide("$toast", methods);
};

export default Toaster;
export { Toaster, ToasterPositions, createToaster };
