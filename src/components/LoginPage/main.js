import { createApp } from 'vue';
import LoginPage from './LoginPage.vue';
import { stateSymbol, state } from './state';

createApp(LoginPage).provide(stateSymbol, state).mount('#app');
