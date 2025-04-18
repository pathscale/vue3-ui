import { shallowMount } from "@vue/test-utils";
import Progress from "./Progress.vue";

let wrapper;

describe("Progress", () => {
  beforeEach(() => {
    wrapper = shallowMount(Progress);
  });

  it("is called", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("render correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
