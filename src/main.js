import { createApp } from 'vue';
import { LoginLayout } from './components';
import { stateSymbol, state } from './state';

createApp(LoginLayout).provide(stateSymbol, state).mount('#app');
