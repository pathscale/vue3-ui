import { createApp } from 'vue';
import Showcase from './views/Showcase.vue';
import { stateSymbol, state } from './state';

createApp(Showcase).provide(stateSymbol, state).mount('#app');
