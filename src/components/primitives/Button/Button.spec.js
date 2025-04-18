import { mount, shallowMount } from "@vue/test-utils";
import Button from "./Button.vue";

let wrapper;

describe("Button", () => {
	beforeEach(() => {
		wrapper = shallowMount(Button);
	});

	it("is called", () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	it("render correctly", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	it("emit a click event", () => {
		wrapper = mount(Button);
		wrapper.find("button").trigger("click");
		expect(wrapper.emitted()).toHaveProperty("click");
	});
	it("should be medium", async () => {
		wrapper.setProps({
			size: "is-medium",
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.classes()).toContain("is-medium");
	});

	it("should be rounded when prop is set to true", async () => {
		wrapper.setProps({
			rounded: true,
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.classes()).toContain("is-rounded");
	});

	it('should set tag to "button" if disabled', () => {
		wrapper = shallowMount(Button, {
			props: {
				tag: "a",
			},
		});
		expect(wrapper.vm.computedTag).toBe("a");

		wrapper = shallowMount(Button, {
			props: {
				tag: "a",
			},
			attrs: {
				disabled: true,
			},
		});
		expect(wrapper.vm.computedTag).toBe("button");
	});
});
