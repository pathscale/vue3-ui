import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Textarea from "../Textarea.vue";

describe("Textarea", () => {
  it("renders with default props", () => {
    const wrapper = mount(Textarea);
    expect(wrapper.find(".control").exists()).toBe(true);
    expect(wrapper.find("textarea").exists()).toBe(true);
  });

  it("handles v-model correctly", async () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: "Initial text",
      },
    });
    expect(wrapper.find("textarea").element.value).toBe("Initial text");

    await wrapper.find("textarea").setValue("New text");
    const emitted = wrapper.emitted("update:modelValue");
    expect(emitted).toBeTruthy();
    expect(emitted).toHaveLength(1);
    expect(emitted?.[0]).toEqual(["New text"]);
  });

  it("applies style props correctly", () => {
    const wrapper = mount(Textarea, {
      props: {
        color: "is-primary",
        size: "is-large",
      },
    });
    const textarea = wrapper.find("textarea");
    expect(textarea.classes()).toContain("is-primary");
    expect(textarea.classes()).toContain("is-large");
    expect(wrapper.find(".control").classes()).toContain("is-large");
  });

  it("shows loading state", () => {
    const wrapper = mount(Textarea, {
      props: {
        loading: true,
      },
    });
    expect(wrapper.find(".control").classes()).toContain("is-loading");
  });

  it("applies hover state", () => {
    const wrapper = mount(Textarea, {
      props: {
        hovered: true,
      },
    });
    expect(wrapper.find("textarea").classes()).toContain("is-hovered");
  });

  it("applies focus state", () => {
    const wrapper = mount(Textarea, {
      props: {
        focused: true,
      },
    });
    expect(wrapper.find("textarea").classes()).toContain("is-focused");
  });

  it("handles focus and blur events", async () => {
    const wrapper = mount(Textarea);
    const textarea = wrapper.find("textarea");

    await textarea.trigger("focus");
    expect(wrapper.vm.isFocused).toBe(true);

    await textarea.trigger("blur");
    expect(wrapper.vm.isFocused).toBe(false);
  });

  it("shows character counter when hasCounter and maxlength are set", () => {
    const wrapper = mount(Textarea, {
      props: {
        hasCounter: true,
        maxlength: "100",
        modelValue: "Hello",
      },
    });
    expect(wrapper.find("small").exists()).toBe(true);
    expect(wrapper.find("small").text()).toBe("5 / 100");
  });

  it("hides counter when not focused", async () => {
    const wrapper = mount(Textarea, {
      props: {
        hasCounter: true,
        maxlength: "100",
        modelValue: "Hello",
      },
    });
    expect(wrapper.find("small").classes()).toContain("is-invisible");

    await wrapper.find("textarea").trigger("focus");
    expect(wrapper.find("small").classes()).not.toContain("is-invisible");

    await wrapper.find("textarea").trigger("blur");
    expect(wrapper.find("small").classes()).toContain("is-invisible");
  });

  it("inherits HTML attributes", () => {
    const wrapper = mount(Textarea, {
      attrs: {
        placeholder: "Enter text here",
        rows: "5",
        name: "description",
      },
    });
    const textarea = wrapper.find("textarea");
    expect(textarea.attributes("placeholder")).toBe("Enter text here");
    expect(textarea.attributes("rows")).toBe("5");
    expect(textarea.attributes("name")).toBe("description");
  });

  it("updates value when modelValue prop changes", async () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: "Initial",
      },
    });
    // @ts-expect-error
    await wrapper.setProps({ modelValue: "Updated" });
    expect(wrapper.find("textarea").element.value).toBe("Updated");
  });
});
