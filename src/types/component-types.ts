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

/**
 * This object used for every page item inside pagination
 *
 * https://vue3.dev/documentation/pagination
 */
export interface PaginationPage {
  number?: number;
  isCurrent?: boolean;
  click?: (e: Event) => void;
  disabled?: boolean;
  class?: string;
  "aria-label"?: string | null;
}

/**
 * https://vue3.dev/documentation/tabs
 */
export type Tab = {
  id: number | string;
  disabled: boolean;
  label: string;
};

export type TabsState = {
  activeTab: number | string;
  activeHeight: number | null;
  tabs: Tab[];
  animated: boolean;
  vanimated: boolean;
};
