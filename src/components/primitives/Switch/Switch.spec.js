import { shallowMount } from "@vue/test-utils";
import Switch from "./Switch.vue";

let wrapper;

describe("Switch", () => {
	beforeEach(() => {
		wrapper = shallowMount(Switch);
	});

	it("is called", () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	it("render correctly", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});
});
