import { shallowMount } from "@vue/test-utils";
import Textarea from "./Textarea.vue";

let wrapper;

describe("Textarea", () => {
  beforeEach(() => {
    wrapper = shallowMount(Textarea);
  });

  it("is called", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("render correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
