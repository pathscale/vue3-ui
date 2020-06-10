const propsToStyles = ({ props, transform }: any): String =>
  Object.keys(transform)
    .map((rule) => transform[rule][props[rule]])
    .join(" ");

export default propsToStyles;
