import { shallowMount } from "@vue/test-utils";
import Select from "./Select.vue";

let wrapper;

describe("Select", () => {
  beforeEach(() => {
    wrapper = shallowMount(Select);
  });

  it("is called", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("render correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
