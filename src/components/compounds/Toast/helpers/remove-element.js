const removeElement = (el) => {
	if (typeof el.remove !== "undefined") {
		el.remove();
	} else {
		// eslint-disable-next-line unicorn/prefer-node-remove -- ignore
		el.parentNode.removeChild(el);
	}
};

export { removeElement };
