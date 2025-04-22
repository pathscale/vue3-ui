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
  "aria-label"?: string;
}
