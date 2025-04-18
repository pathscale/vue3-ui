import { inject, provide, reactive } from "vue";

const globalSettingsSymbol = Symbol("global-settings");

const createSettings = () => {
  const button = reactive({
    rounded: false,
  });

  return {
    button,
  };
};

export const createGlobalSettings = () => {
  const settings = createSettings();

  return {
    ...settings,
    install(app) {
      app.provide(globalSettingsSymbol, settings);
    },
  };
};

export const useGlobalSettings = () => inject(globalSettingsSymbol);

export const provideGlobalSettings = () =>
  provide(globalSettingsSymbol, createSettings());
