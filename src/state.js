import { inject, reactive } from "vue";

export const stateSymbol = Symbol("state");
export const state = reactive({
	isLoggedIn: false,
	email: "",
	remember: false,
});
export const useState = () => inject(stateSymbol);
