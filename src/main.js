import { createApp } from 'vue';
import App from './views/App.vue';
import { stateSymbol, state } from './state';
import { createGlobalSettings } from './components';

createApp(App)
  .use(createGlobalSettings())
  .provide(stateSymbol, state)
  .mount('#app');
