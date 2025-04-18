import { shallowMount } from "@vue/test-utils";
import Slider from "./Slider.vue";

let wrapper;

describe("Slider", () => {
	beforeEach(() => {
		wrapper = shallowMount(Slider);
	});

	it("is called", () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	it("render correctly", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});
});
