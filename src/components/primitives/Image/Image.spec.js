import { shallowMount } from "@vue/test-utils";
// eslint-disable-next-line no-shadow -- ignore warning
import Image from "./Image.vue";

let wrapper;

describe("Image", () => {
  beforeEach(() => {
    wrapper = shallowMount(Image);
  });

  it("is called", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("render correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
