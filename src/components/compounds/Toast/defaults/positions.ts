enum Positions {
  TOP_RIGHT = "top-right",
  TOP = "top",
  TOP_LEFT = "top-left",
  BOTTOM_RIGHT = "bottom-right",
  BOTTOM = "bottom",
  BOTTOM_LEFT = "bottom-left",
}

export default Positions;

export function definePosition(position, top, bottom) {
  let result = null;
  switch (position) {
    case Positions.TOP:
    case Positions.TOP_RIGHT:
    case Positions.TOP_LEFT:
      result = top;
      break;

    case Positions.BOTTOM:
    case Positions.BOTTOM_RIGHT:
    case Positions.BOTTOM_LEFT:
      result = bottom;
      break;
    default:
      result = top;
  }
  return result;
}
