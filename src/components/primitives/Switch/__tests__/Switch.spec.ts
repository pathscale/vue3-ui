import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";
import Switch from "../Switch.vue";

describe("Switch", () => {
  it("renders default switch", () => {
    const wrapper = mount(Switch);
    expect(wrapper.find(".switch").exists()).toBe(true);
    expect(wrapper.find("input[type='checkbox']").exists()).toBe(true);
    expect(wrapper.find(".check").exists()).toBe(true);
    expect(wrapper.find(".control-label").exists()).toBe(true);
  });

  it("handles v-model correctly", async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
      } as const,
    });

    const input = wrapper.find("input");
    expect(input.element.checked).toBe(false);

    await input.setValue(true);
    await nextTick();
    await nextTick();

    const emittedEvents = wrapper.emitted("update:modelValue");
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents?.[emittedEvents.length - 1]).toEqual([true]);
  });

  it("applies size classes", () => {
    const wrapper = mount(Switch, {
      props: {
        size: "is-small",
      } as const,
    });
    expect(wrapper.find(".switch").classes()).toContain("is-small");
  });

  it("applies type and passive classes", () => {
    const wrapper = mount(Switch, {
      props: {
        type: "is-primary",
        passiveType: "is-success",
      } as const,
    });
    const check = wrapper.find(".check");
    expect(check.classes()).toContain("is-primary");
    expect(check.classes()).toContain("is-success-passive");
  });

  it("applies state classes", () => {
    const wrapper = mount(Switch, {
      props: {
        disabled: true,
        rounded: false,
        outlined: true,
      } as const,
    });
    const switchEl = wrapper.find(".switch");
    expect(switchEl.classes()).toContain("is-disabled");
    expect(switchEl.classes()).not.toContain("is-rounded");
    expect(switchEl.classes()).toContain("is-outlined");
  });

  it("handles custom true/false values", async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: "no",
        trueValue: "yes",
        falseValue: "no",
      } as const,
    });

    const input = wrapper.find("input");
    expect(input.element.checked).toBe(false);

    await input.setValue("yes");
    await nextTick();
    await nextTick();

    const emittedEvents = wrapper.emitted("update:modelValue");
    expect(emittedEvents).toBeTruthy();
    expect(emittedEvents?.[emittedEvents.length - 1]).toEqual(["yes"]);
  });

  it("handles native value", () => {
    const wrapper = mount(Switch, {
      props: {
        nativeValue: "test-value",
      } as const,
    });
    expect(wrapper.find("input").attributes("value")).toBe("test-value");
  });

  it("sets HTML attributes", () => {
    const wrapper = mount(Switch, {
      props: {
        name: "test-switch",
        required: true,
        disabled: true,
      } as const,
    });
    const input = wrapper.find("input");
    expect(input.attributes("name")).toBe("test-switch");
    expect(input.attributes("required")).toBeDefined();
    expect(input.attributes("disabled")).toBeDefined();
  });

  it("renders slot content", () => {
    const wrapper = mount(Switch, {
      slots: {
        default: "Switch Label",
      },
    });
    expect(wrapper.find(".control-label").text()).toBe("Switch Label");
  });

  it("updates when modelValue prop changes", async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
      } as const,
    });

    expect(wrapper.find("input").element.checked).toBe(false);

    // @ts-expect-error - Known issue with setProps types
    await wrapper.setProps({ modelValue: true });
    await nextTick();
    await nextTick();

    expect(wrapper.find("input").element.checked).toBe(true);
  });

  it("stops click event propagation", async () => {
    const parentClick = vi.fn();
    const wrapper = mount(Switch, {
      attrs: {
        onClick: parentClick,
      },
    });

    await wrapper.find("input").trigger("click");
    expect(parentClick).not.toHaveBeenCalled();
  });
});
