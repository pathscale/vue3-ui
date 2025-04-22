import { type Component, type VNode, h, render } from "vue";

const createElement = () =>
  typeof document !== "undefined" && document.createElement("div");

const mount = (
  component: Component,
  { props, children, element, app } = {},
) => {
  let el = element || createElement();

  let vNode: VNode | null = h(component, props, children);

  if (app?._context) {
    vNode.appContext = app._context;
  }

  render(vNode, el);

  const destroy = () => {
    if (el) {
      render(null, el);
    }
    el = null;
    vNode = null;
  };

  return { vNode, destroy, el };
};

export default mount;
