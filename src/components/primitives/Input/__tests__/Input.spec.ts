import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h, nextTick } from "vue";
import Input from "../Input.vue";

describe("Input", () => {
  it("renders default input", () => {
    const wrapper = mount(Input);
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find(".control").exists()).toBe(true);
  });

  it("updates v-model value", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "initial",
      },
    });

    const input = wrapper.find("input");
    await input.setValue("new value");
    await nextTick();

    const emitted = wrapper.emitted("update:modelValue");
    expect(emitted).toBeTruthy();
    if (emitted) {
      expect(emitted[emitted.length - 1]).toEqual(["new value"]);
    }
  });

  it("applies color class", () => {
    const wrapper = mount(Input, {
      props: {
        color: "is-primary",
      },
    });
    expect(wrapper.find("input").classes()).toContain("is-primary");
  });

  it("applies size class", () => {
    const wrapper = mount(Input, {
      props: {
        size: "is-large",
      },
    });
    expect(wrapper.find(".control").classes()).toContain("is-large");
    expect(wrapper.find("input").classes()).toContain("is-large");
  });

  it("applies rounded class", () => {
    const wrapper = mount(Input, {
      props: {
        rounded: true,
      },
    });
    expect(wrapper.find("input").classes()).toContain("is-rounded");
  });

  it("shows loading state", () => {
    const wrapper = mount(Input, {
      props: {
        loading: true,
      },
    });
    expect(wrapper.find(".control").classes()).toContain("is-loading");
  });

  it("applies expanded class", () => {
    const wrapper = mount(Input, {
      props: {
        expanded: true,
      },
    });
    expect(wrapper.find("input").classes()).toContain("is-expanded");
  });

  it("renders left icon", () => {
    const wrapper = mount(Input, {
      slots: {
        leftIcon: h("i", { class: "icon-left" }),
      },
    });
    expect(wrapper.find(".control").classes()).toContain("has-icons-left");
    expect(wrapper.find(".icon.is-left").exists()).toBe(true);
    expect(wrapper.find(".icon-left").exists()).toBe(true);
  });

  it("renders right icon", () => {
    const wrapper = mount(Input, {
      slots: {
        rightIcon: h("i", { class: "icon-right" }),
      },
    });
    expect(wrapper.find(".control").classes()).toContain("has-icons-right");
    expect(wrapper.find(".icon.is-right").exists()).toBe(true);
    expect(wrapper.find(".icon-right").exists()).toBe(true);
  });

  describe("password reveal", () => {
    it("shows password reveal icon when enabled", () => {
      const wrapper = mount(Input, {
        props: {
          passwordReveal: true,
          type: "password",
        },
      });
      expect(wrapper.find(".control").classes()).toContain("has-icons-right");
      expect(wrapper.find(".icon.is-right").exists()).toBe(true);
      expect(wrapper.findComponent({ name: "EyeIcon" }).exists()).toBe(true);
    });

    it("toggles password visibility on click", async () => {
      const wrapper = mount(Input, {
        props: {
          passwordReveal: true,
          type: "password",
        },
      });

      const input = wrapper.find("input");
      expect(input.attributes("type")).toBe("password");

      await wrapper.find(".is-clickable").trigger("click");
      await nextTick();
      expect(input.attributes("type")).toBe("text");

      await wrapper.find(".is-clickable").trigger("click");
      await nextTick();
      expect(input.attributes("type")).toBe("password");
    });

    it("uses custom right icon with password reveal", () => {
      const wrapper = mount(Input, {
        props: {
          passwordReveal: true,
          type: "password",
        },
        slots: {
          rightIcon: h("i", { class: "custom-eye" }),
        },
      });
      expect(wrapper.find(".custom-eye").exists()).toBe(true);
    });
  });

  it("passes HTML attributes to input element", () => {
    const wrapper = mount(Input, {
      attrs: {
        placeholder: "Enter text",
        maxlength: "10",
        required: true,
      },
    });
    const input = wrapper.find("input");
    expect(input.attributes("placeholder")).toBe("Enter text");
    expect(input.attributes("maxlength")).toBe("10");
    expect(input.attributes("required")).toBe("");
  });
});
