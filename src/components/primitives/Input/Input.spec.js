import { shallowMount } from "@vue/test-utils";
import Input from "./Input.vue";

let wrapper;

describe("Input", () => {
  beforeEach(() => {
    wrapper = shallowMount(Input);
  });

  it("is called", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("render correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
