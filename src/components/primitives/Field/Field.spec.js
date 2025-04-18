import { mount, shallowMount } from "@vue/test-utils";
import Input from "../Input/Input.vue";
import Field from "./Field.vue";

let wrapper;

describe("Field", () => {
	beforeEach(() => {
		wrapper = shallowMount(Field);
	});

	it("is called", () => {
		expect(wrapper.exists()).toBeTruthy();
	});

	it("render correctly", () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('adds a help <p> element in the root div.field when "message" prop is passed', async () => {
		wrapper = mount(Field, {
			slots: {
				default: [Input],
			},
			props: {
				type: "is-danger",
			},
		});

		const message = "This is a message";

		expect(wrapper.findAll("p")).toEqual([]);

		wrapper.setProps({ message });
		await wrapper.vm.$nextTick();
		expect(wrapper.find("p").classes()).toEqual(["help", "is-danger"]);
		expect(wrapper.find("p").text()).toBe(message);
	});

	it('adds a label element under the root div.field when "label" prop is passed', () => {
		wrapper = shallowMount(Field, {
			propsData: {
				label: "Some label",
			},
		});
		expect(wrapper.find("label").text()).toBe("Some label");
	});
});
