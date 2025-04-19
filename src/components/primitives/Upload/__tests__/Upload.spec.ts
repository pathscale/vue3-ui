import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Upload from "../Upload.vue";

describe("Upload", () => {
  it("renders with default props", () => {
    const wrapper = mount(Upload);
    expect(wrapper.find(".file").exists()).toBe(true);
    expect(wrapper.find('input[type="file"]').exists()).toBe(true);
  });
});
