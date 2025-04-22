import type { MaybeRef, Ref } from "vue";
import { inject, provide, toRef } from "vue";

const TabsSymbol = Symbol("Tabs");

export function provideTabsStore<T>(store: MaybeRef<T>) {
  const storeRef = toRef(store);
  provide(TabsSymbol, storeRef);
  return storeRef;
}

export function useTabsStore<T>(): Ref<T> {
  const store = inject<Ref<T>>(TabsSymbol);
  if (!store) {
    throw new Error("no store provided");
  }
  return store;
}

export function addTabToStore<Tab, T extends { tabs: Tab[] } = { tabs: Tab[] }>(
  tab: Tab,
) {
  const tabs = useTabsStore<T>();
  tabs.value.tabs.push(tab);
}
