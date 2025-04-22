import { inject, provide, ref } from "vue";

const TabsSymbol = Symbol("Tabs");

export function provideStore(store) {
  const storeRef = ref(store);
  provide(TabsSymbol, storeRef);
  return storeRef;
}

export function useStore() {
  const store = inject(TabsSymbol);
  if (!store) {
    // throw error, no store provided
  }
  return store;
}

export function addToStore(tab) {
  const tabs = useStore();
  tabs.value.tabs.push(tab);
}
