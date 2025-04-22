const removeElement = (el: HTMLElement) => {
  if (typeof el.remove !== "undefined") {
    el.remove();
  } else {
    el.parentNode?.removeChild(el);
  }
};

export { removeElement };
