import Toaster from "./Toaster.vue";
import createToaster from "./api.js";
import ToasterPositions from "./defaults/positions.js";

Toaster.install = (app, options = {}) => {
	const methods = createToaster(options);
	app.config.globalProperties.$toast = methods;
	app.provide("$toast", methods);
};

export default Toaster;
export { Toaster, ToasterPositions, createToaster };
