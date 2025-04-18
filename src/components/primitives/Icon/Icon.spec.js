import { shallowMount } from "@vue/test-utils";
import Icon from "./Icon.vue";

let wrapper;

describe("Icon", () => {
	beforeEach(() => {
		wrapper = shallowMount(Icon);
	});

	it("is called", () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	it("render correctly", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});
});
