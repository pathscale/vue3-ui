import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Container from "../Container.vue";

describe("Container", () => {
  it("renders with default props", () => {
    const wrapper = mount(Container);
    expect(wrapper.html({ raw: true })).toContain(
      '<div class="container"></div>',
    );
  });
});
