import { shallowMount } from "@vue/test-utils";
import Tooltip from "./Tooltip.vue";

let wrapper;

describe("Tooltip", () => {
	beforeEach(() => {
		wrapper = shallowMount(Tooltip);
	});

	it("is called", () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	it("render correctly", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});
});
