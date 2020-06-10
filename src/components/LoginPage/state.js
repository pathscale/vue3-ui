import { reactive, inject } from 'vue';

export const stateSymbol = Symbol('state');
export const state = reactive({ isLoggedIn: false, email: '' });

export const useState = () => inject(stateSymbol);
