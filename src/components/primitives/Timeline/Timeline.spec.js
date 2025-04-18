import { shallowMount } from "@vue/test-utils";
import Timeline from "./Timeline.vue";

let wrapper;

describe("Timeline", () => {
  beforeEach(() => {
    wrapper = shallowMount(Timeline);
  });

  it("is called", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("render correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
