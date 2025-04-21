/**
 * @see https://vue3.dev/documentation/checkbox#api
 */
export interface CheckRadioProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  nativeValue?: any; // todo update doc: add set any type
  type?:
    | "is-white"
    | "is-light"
    | "is-dark"
    | "is-black"
    | "is-text"
    | "is-primary"
    | "is-link"
    | "is-info"
    | "is-success"
    | "is-warning"
    | "is-danger";
  disabled?: boolean;
  required?: boolean;
  name?: string;
  size?: "is-small" | "is-medium" | "is-large";
}
