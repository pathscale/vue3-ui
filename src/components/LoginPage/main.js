import { createApp } from 'vue';
import LoginPage from './LoginPage';
import { stateSymbol, state } from './state';

createApp(LoginPage).provide(stateSymbol, state).mount('#app');
