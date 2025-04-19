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

  it("render with type class", () => {
    const wrapper = mount(Container, {
      props: {
        type: "type-class-1 type-class-2",
      },
    });
    expect(wrapper.classes()).length(3);
    expect(wrapper.classes()).toContain("container");
    expect(wrapper.classes()).toContain("type-class-1");
    expect(wrapper.classes()).toContain("type-class-2");
  });

  it("render with background image", () => {
    const wrapper = mount(Container, {
      props: {
        bg: "https://example.com/image.jpg",
      },
    });
    const containerEl = wrapper.element;
    expect(containerEl.style.backgroundImage).toBe(
      "url(https://example.com/image.jpg)",
    );
    expect(containerEl.style.backgroundSize).toBe("cover");
    expect(containerEl.style.backgroundRepeat).toBe("no-repeat");
  });
});
