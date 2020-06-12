declare module "*.vue" {
  // eslint-disable-next-line no-unused-vars -- needed for type
  import { ComponentOptions } from "vue";

  const component: ComponentOptions;
  export default component;
}
