// TODO: Figure out how to keep variables up-to-date
// TODO: Dynamic `transition` name search logic

export const transitions = ['fade', 'slide', 'slide-right', 'slide-left']

export const textual = {
  separator: undefined,
  position: undefined,
  size: undefined,
  radio: undefined,
  type: undefined,
  color: undefined,
  alignment: undefined,
  newType: undefined,
  closeType: undefined,
  passiveType: undefined,
  customClass: undefined,
  passiveClass: undefined,
  navClasses: undefined,
  spanClasses: undefined,
  rootClasses: undefined,
  inputClasses: undefined,
  computedClasses: undefined,
  anchorClasses: undefined,
  itemClasses: undefined,
  triggerClasses: undefined,
  headerClasses: undefined,
  menuClasses: undefined,
  linkClasses: undefined,
  collapsibleClasses: undefined,
  addonClasses: undefined,
  ellipsisClasses: undefined,
  buttonClasses: undefined,
  animatedClasses: undefined,
  valueClasses: undefined,
  figureClasses: undefined,
  imgClasses: undefined,
  // Functions
  columnClasses: () : void => undefined,
  selectedClasses: () : void => undefined,
  cellClasses: () : void => undefined,
  tabClasses: () : void => undefined,
  labelClasses: () : void => undefined,
}

export const truthy = {
  column: { style: undefined, selected: true },
  row: { style: undefined, selected: true },
  tabs: { activeTab: true },
  t: { disabled: true },
  state: { isHoverable: true, newActive: true },
  closeIcon: true,
  ellipsis: true,
  disabled: true,
  arrowless: true,
  centered: true,
  collapsible: true,
  hasName: true,
  icon: true,
  fullwidth: true,
  right: true,
  boxed: true,
  isOpened: true,
  rounded: true,
  computedRounded: true,
  animated: true,
  loading: true,
  outlined: true,
  expanded: true,
  inverted: true,
  focused: true,
  light: true,
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
  vanimated: true,
  isActive: true,
  headerIsTrigger: true,
  isBordered: true,
  isStriped: true,
  isNarrow: true,
  isHoverablee: true,
  isFullwidth: true,
  sticky: true,
  grouped: true,
}

export const falsy = {
  ...Object.keys(truthy).reduce((acc, k) => ({ ...acc, [k]: false }), {}),
  column: { style: undefined, selected: false },
  row: { style: undefined, selected: false },
  tabs: { activeTab: false },
  t: { disabled: false },
  state: { isHoverable: false, newActive: false },
}
