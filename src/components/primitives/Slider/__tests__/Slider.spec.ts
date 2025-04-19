import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Slider from "../Slider.vue";

describe("Slider", () => {
  it("renders with default props", () => {
    const wrapper = mount(Slider);
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.classes()).toContain("slider");
    expect(input.classes()).toContain("is-fullwidth");
    expect(input.attributes("type")).toBe("range");
    expect(input.attributes("min")).toBe("0");
    expect(input.attributes("max")).toBe("100");
    expect(input.attributes("step")).toBe("1");
  });

  it("applies type class", () => {
    const wrapper = mount(Slider, {
      props: {
        type: "is-primary",
      },
    });
    expect(wrapper.find("input").classes()).toContain("is-primary");
  });

  it("applies size class", () => {
    const wrapper = mount(Slider, {
      props: {
        size: "is-small",
      },
    });
    expect(wrapper.find("input").classes()).toContain("is-small");
  });

  it("sets min, max and step attributes", () => {
    const wrapper = mount(Slider, {
      props: {
        min: 10,
        max: 200,
        step: 5,
      },
    });
    const input = wrapper.find("input");
    expect(input.attributes("min")).toBe("10");
    expect(input.attributes("max")).toBe("200");
    expect(input.attributes("step")).toBe("5");
  });

  it("adds rounded class when rounded prop is true", () => {
    const wrapper = mount(Slider, {
      props: {
        rounded: true,
      },
    });
    expect(wrapper.find("input").classes()).toContain("is-circle");
  });

  it("shows tooltip when tooltip prop is true", () => {
    const wrapper = mount(Slider, {
      props: {
        tooltip: true,
        modelValue: 50,
      },
    });
    expect(wrapper.find("input").classes()).toContain("has-output-tooltip");
    expect(wrapper.find("output").exists()).toBe(true);
    expect(wrapper.find("output").text()).toBe("50");
  });

  it("disables input when disabled prop is true", () => {
    const wrapper = mount(Slider, {
      props: {
        disabled: true,
      },
    });
    expect(wrapper.find("input").attributes("disabled")).toBe("");
  });

  it("sets vertical orientation", () => {
    const wrapper = mount(Slider, {
      props: {
        vertical: true,
      },
    });
    expect(wrapper.find("input").attributes("orient")).toBe("vertical");
  });

  it("emits update:modelValue when value changes", async () => {
    const wrapper = mount(Slider, {
      props: {
        modelValue: 30,
      },
    });
    await wrapper.find("input").setValue(45);
    const emitted = wrapper.emitted("update:modelValue");
    expect(emitted).toBeTruthy();
    expect(emitted?.[0]).toEqual([30]);
    expect(emitted?.[1]).toEqual(["45"]);
  });

  it("updates value when modelValue prop changes", async () => {
    const wrapper = mount(Slider, {
      props: {
        modelValue: 30,
      },
    });
    await wrapper.find("input").setValue(60);
    expect(wrapper.find("input").element.value).toBe("60");
  });

  it("updates tooltip position when value changes", async () => {
    const wrapper = mount(Slider, {
      props: {
        modelValue: 50,
        tooltip: true,
      },
    });
    await wrapper.find("input").setValue(75);
    expect(wrapper.find("output").attributes("style")).toContain("left:");
  });
});
