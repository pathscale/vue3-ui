import type { InjectionKey } from "vue";

export type DDSelection = {
  // biome-ignore lint/suspicious/noExplicitAny: allow any type according to docs
  value: any;
  // biome-ignore lint/suspicious/noExplicitAny: allow any type according to docs
  selectItem: (newValue: any) => void;
};

export const DropdownSymbol = Symbol("Dropdown") as InjectionKey<DDSelection>;
