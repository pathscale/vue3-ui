// TODO: Figure out how to keep variables up-to-date

export const context = {
  position: undefined,
  size: undefined,
  type: undefined,
  newType: undefined,
  closeType: undefined,
  passiveType: undefined,
  customClass: undefined,
  navClasses: undefined,
  spanClasses: undefined,
  rootClasses: undefined,
  inputClasses: undefined,
  computedClasses: undefined,
  anchorClasses: undefined,
  itemClasses: undefined,
}

export const truthy = {
  tabs: { activeTab: true },
  t: { disabled: true },
  state: { isHoverable: true, newActive: true },
  closeIcon: true,
  ellipsis: true,
  disabled: true,
  arrowless: true,
  collapsible: true,
  right: true,
  boxed: true,
  isOpened: true,
  rounded: true,
  computedRounded: true,
  loading: true,
  outlined: true,
  expanded: true,
  inverted: true,
  focused: true,
  isFocused: true,
  active: true,
  hovered: true,
  selected: true,
  square: true,
  newAnimated: true,
  newActive: true,
  newExpanded: true,
  always: true,
  multilined: true,
  dashed: true,
}

export const falsy = {
  // eslint-disable-next-line unicorn/no-reduce
  ...Object.keys(truthy).reduce((acc, k) => ({ ...acc, [k]: false }), {}),
  tabs: { activeTab: false },
  t: { disabled: false },
  state: { isHoverable: false, newActive: false },
}
