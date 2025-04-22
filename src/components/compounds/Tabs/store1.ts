import type { MaybeRef, Ref } from "vue";
import { inject, provide, toRef } from "vue";

const TabsSymbol = Symbol("Tabs");

export function provideStore<T>(store: MaybeRef<T>) {
  const storeRef = toRef(store);
  provide(TabsSymbol, storeRef);
  return storeRef;
}

export function useStore<T>(): T {
  const store = inject<T>(TabsSymbol);
  if (!store) {
    throw new Error("no store provided");
  }
  return store;
}

export function addToStore<Tab, T extends { tabs: Tab[] }>(tab: Tab) {
  const tabs = useStore<Ref<T>>();
  tabs.value.tabs.push(tab);
}
