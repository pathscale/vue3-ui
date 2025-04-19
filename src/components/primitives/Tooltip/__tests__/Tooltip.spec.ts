import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Tooltip from "../Tooltip.vue";

describe("Tooltip", () => {
  it("renders with default props", () => {
    const wrapper = mount(Tooltip, {
      props: {
        label: "Test tooltip",
      },
    });
    expect(wrapper.find("span").exists()).toBe(true);
    expect(wrapper.find("span").classes()).toContain("v-tooltip");
    expect(wrapper.find("span").classes()).toContain("is-primary");
    expect(wrapper.find("span").classes()).toContain("is-top");
    expect(wrapper.find("span").classes()).toContain("is-medium");
    expect(wrapper.find("span").attributes("data-label")).toBe("Test tooltip");
  });

  it("applies type class", () => {
    const wrapper = mount(Tooltip, {
      props: {
        label: "Test tooltip",
        type: "is-danger",
      },
    });
    expect(wrapper.classes()).toContain("is-danger");
  });

  it("applies position class", () => {
    const wrapper = mount(Tooltip, {
      props: {
        label: "Test tooltip",
        position: "is-bottom",
      },
    });
    expect(wrapper.classes()).toContain("is-bottom");
  });

  it("applies size class", () => {
    const wrapper = mount(Tooltip, {
      props: {
        label: "Test tooltip",
        size: "is-small",
      },
    });
    expect(wrapper.classes()).toContain("is-small");
  });

  it("can be deactivated", () => {
    const wrapper = mount(Tooltip, {
      props: {
        label: "Test tooltip",
        active: false,
      },
    });
    expect(wrapper.classes()).not.toContain("v-tooltip");
  });

  it("applies square class when square prop is true", () => {
    const wrapper = mount(Tooltip, {
      props: {
        label: "Test tooltip",
        square: true,
      },
    });
    expect(wrapper.classes()).toContain("is-square");
  });

  it("applies animated class when animated prop is true", () => {
    const wrapper = mount(Tooltip, {
      props: {
        label: "Test tooltip",
        animated: true,
      },
    });
    expect(wrapper.classes()).toContain("is-animated");
  });

  it("applies always class when always prop is true", () => {
    const wrapper = mount(Tooltip, {
      props: {
        label: "Test tooltip",
        always: true,
      },
    });
    expect(wrapper.classes()).toContain("is-always");
  });

  it("applies multiline class when multilined prop is true", () => {
    const wrapper = mount(Tooltip, {
      props: {
        label: "Test tooltip",
        multilined: true,
      },
    });
    expect(wrapper.classes()).toContain("is-multiline");
  });

  it("applies dashed class when dashed prop is true", () => {
    const wrapper = mount(Tooltip, {
      props: {
        label: "Test tooltip",
        dashed: true,
      },
    });
    expect(wrapper.classes()).toContain("is-dashed");
  });

  it("applies transition delay style", () => {
    const wrapper = mount(Tooltip, {
      props: {
        label: "Test tooltip",
        delay: 100,
      },
    });
    expect(wrapper.attributes("style")).toBe("transition-delay: 100ms;");
  });

  it("renders slot content", () => {
    const wrapper = mount(Tooltip, {
      props: {
        label: "Test tooltip",
      },
      slots: {
        default: "<button>Hover me</button>",
      },
    });
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("button").text()).toBe("Hover me");
  });

  it("combines multiple conditional classes", () => {
    const wrapper = mount(Tooltip, {
      props: {
        label: "Test tooltip",
        square: true,
        animated: true,
        always: true,
        multilined: true,
        dashed: true,
      },
    });
    const classes = wrapper.classes();
    expect(classes).toContain("is-square");
    expect(classes).toContain("is-animated");
    expect(classes).toContain("is-always");
    expect(classes).toContain("is-multiline");
    expect(classes).toContain("is-dashed");
  });
});
