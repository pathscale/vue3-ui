import { shallowMount } from "@vue/test-utils";
import Media from "./Media.vue";

let wrapper;

describe("Media", () => {
	beforeEach(() => {
		wrapper = shallowMount(Media);
	});

	it("is called", () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	it("render correctly", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});
});
