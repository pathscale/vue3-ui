import Toaster from "./Toaster.vue";
import type Position from "./defaults/position";
import eventBus from "./helpers/event-bus.js";
import mount from "./helpers/mount-component";

export type ToastOptions = {
  type?: "is-success" | "is-danger";
  position?: Position;
  duration?: number | false;
  dismissible?: boolean;
  pauseOnHover?: boolean;
  onClose?: () => void;
  onClick?: () => void;
};

const Api = (globalOptions = {}) => {
  return {
    show(message: string, options = {}) {
      const localOptions = { message, ...options };
      const c = mount(Toaster, {
        props: { ...globalOptions, ...localOptions },
      });

      return c;
    },
    clear() {
      eventBus.$emit("toast-clear");
    },
    success(message: string, options = {}) {
      options.type = "is-success";
      return this.show(message, options);
    },
    error(message: string, options = {}) {
      options.type = "is-danger";
      return this.show(message, options);
    },
    info(message: string, options = {}) {
      options.type = "is-info";
      return this.show(message, options);
    },
    warning(message: string, options = {}) {
      options.type = "is-warning";
      return this.show(message, options);
    },
  };
};

export default Api;
