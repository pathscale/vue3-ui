import { createApp } from 'vue';
import Showcase from './views/Showcase.vue';
import App from './views/App.vue';
import { stateSymbol, state } from './state';

createApp(App).provide(stateSymbol, state).mount('#app');
