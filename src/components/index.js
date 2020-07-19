import '../index.css';
import * as components from "./components"

const Vue3ui = {
  install(app) {
    Object.keys(components).forEach((component) => {
      app.component(component, components[component])
    })
  }
}
export default Vue3ui;

export * from "./components";
export * from "./global-settings";
