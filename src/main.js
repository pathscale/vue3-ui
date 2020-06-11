import { createApp } from 'vue';
import LoginPage from './components/pages/LoginPage/LoginPage.vue';
import { stateSymbol, state } from './state';

createApp(LoginPage).provide(stateSymbol, state).mount('#app');
