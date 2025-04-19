import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Button from "./Button.vue";

describe("Button", () => {
  it("renders default button correctly", () => {
    const wrapper = mount(Button);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain("button");
    expect(wrapper.classes()).toContain("is-primary");
  });

  it("renders label when prop is provided", () => {
    const label = "Click me";
    const wrapper = mount(Button, {
      props: { label },
    });
    expect(wrapper.text()).toBe(label);
  });

  it("renders slot content", () => {
    const slotContent = "Button Content";
    const wrapper = mount(Button, {
      slots: {
        default: slotContent,
      },
    });
    expect(wrapper.text()).toBe(slotContent);
  });

  it("applies type class correctly", () => {
    const wrapper = mount(Button, {
      props: {
        type: "is-danger",
      },
    });
    expect(wrapper.classes()).toContain("is-danger");
  });

  it("applies size class correctly", () => {
    const wrapper = mount(Button, {
      props: {
        size: "is-large",
      },
    });
    expect(wrapper.classes()).toContain("is-large");
  });

  const booleanProps = [
    { prop: "rounded", class: "is-rounded" },
    { prop: "loading", class: "is-loading" },
    { prop: "outlined", class: "is-outlined" },
    { prop: "expanded", class: "is-fullwidth" },
    { prop: "inverted", class: "is-inverted" },
    { prop: "focused", class: "is-focused" },
    { prop: "active", class: "is-active" },
    { prop: "hovered", class: "is-hovered" },
    { prop: "selected", class: "is-selected" },
    { prop: "light", class: "is-light" },
  ];

  for (const { prop, class: className } of booleanProps) {
    it(`applies ${className} class when ${prop} is true`, () => {
      const wrapper = mount(Button, {
        props: {
          [prop]: true,
        },
      });
      expect(wrapper.classes()).toContain(className);
    });
  }

  it("renders as button by default", () => {
    const wrapper = mount(Button);
    expect(wrapper.element.tagName).toBe("BUTTON");
  });

  it('renders as anchor when tag prop is "a"', () => {
    const wrapper = mount(Button, {
      props: {
        tag: "a",
      },
    });
    expect(wrapper.element.tagName).toBe("A");
  });

  it("forces button tag when disabled", () => {
    const wrapper = mount(Button, {
      props: {
        tag: "a",
      },
      attrs: {
        disabled: true,
      },
    });
    expect(wrapper.element.tagName).toBe("BUTTON");
  });

  it("sets correct native type attribute", () => {
    const wrapper = mount(Button, {
      props: {
        nativeType: "submit",
      },
    });
    expect(wrapper.attributes("type")).toBe("submit");
  });

  it("emits click event when clicked", async () => {
    const wrapper = mount(Button);
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeTruthy();
  });

  it("does not emit click event when disabled", async () => {
    const wrapper = mount(Button, {
      attrs: {
        disabled: true,
      },
    });
    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toBeFalsy();
  });
});
