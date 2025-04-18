import { shallowMount } from "@vue/test-utils";
import Tag from "./Tag.vue";

let wrapper;

describe("Tag", () => {
	beforeEach(() => {
		wrapper = shallowMount(Tag);
	});

	it("is called", () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	it("render correctly", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});
});
