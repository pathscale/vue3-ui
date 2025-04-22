enum Position {
  TOP_RIGHT = "top-right",
  TOP = "top",
  TOP_LEFT = "top-left",
  BOTTOM_RIGHT = "bottom-right",
  BOTTOM = "bottom",
  BOTTOM_LEFT = "bottom-left",
}

export default Position;

export function definePosition(position: Position, top, bottom) {
  let result = null;
  switch (position) {
    case Position.TOP:
    case Position.TOP_RIGHT:
    case Position.TOP_LEFT:
      result = top;
      break;

    case Position.BOTTOM:
    case Position.BOTTOM_RIGHT:
    case Position.BOTTOM_LEFT:
      result = bottom;
      break;
    default:
      result = top;
  }
  return result;
}
