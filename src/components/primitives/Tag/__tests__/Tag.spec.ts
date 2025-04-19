import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Tag from "../Tag.vue";

describe("Tag", () => {
  it("renders with default props", () => {
    const wrapper = mount(Tag, {
      slots: {
        default: "Tag Text",
      },
    });
    expect(wrapper.find(".tag").exists()).toBe(true);
    expect(wrapper.text()).toBe("Tag Text");
  });

  it("applies style props correctly", () => {
    const wrapper = mount(Tag, {
      props: {
        type: "is-primary",
        size: "is-medium",
        rounded: true,
      },
    });
    const tag = wrapper.find(".tag");
    expect(tag.classes()).toContain("is-primary");
    expect(tag.classes()).toContain("is-medium");
    expect(tag.classes()).toContain("is-rounded");
  });

  it("handles closable prop", () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true,
      },
    });
    expect(wrapper.find(".delete").exists()).toBe(true);
  });

  it("emits close event when delete button is clicked", async () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true,
      },
    });
    await wrapper.find(".delete").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
  });

  it("does not emit close event when disabled", async () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true,
        disabled: true,
      },
    });
    await wrapper.find(".delete").trigger("click");
    expect(wrapper.emitted("close")).toBeFalsy();
  });

  it("handles attached mode correctly", () => {
    const wrapper = mount(Tag, {
      props: {
        attached: true,
        closable: true,
      },
    });
    expect(wrapper.find(".tags.has-addons").exists()).toBe(true);
    expect(wrapper.find(".is-delete").exists()).toBe(true);
  });

  it("shows ellipsis when ellipsis prop is true", () => {
    const wrapper = mount(Tag, {
      props: {
        ellipsis: true,
      },
      slots: {
        default: "Long text that should be ellipsized",
      },
    });
    expect(wrapper.find(".has-ellipsis").exists()).toBe(true);
  });

  it("handles tabstop correctly", () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true,
        tabstop: false,
      },
    });
    expect(wrapper.find(".delete").attributes("tabindex")).toBe("false");

    const wrapperWithTabstop = mount(Tag, {
      props: {
        closable: true,
        tabstop: true,
      },
    });
    expect(wrapperWithTabstop.find(".delete").attributes("tabindex")).toBe("0");
  });

  it("applies aria-label to close button", () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true,
        ariaCloseLabel: "Close tag",
      },
    });
    expect(wrapper.find(".delete").attributes("aria-label")).toBe("Close tag");
  });

  it("applies close type class", () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true,
        closeType: "is-danger",
      },
    });
    expect(wrapper.find(".delete").classes()).toContain("is-danger");
  });

  it("shows custom close icon when provided", () => {
    const wrapper = mount(Tag, {
      props: {
        attached: true,
        closable: true,
        closeIcon: "custom-icon",
      },
    });
    expect(wrapper.find(".has-delete-icon").exists()).toBe(true);
  });

  it("handles keyboard delete event", async () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true,
      },
    });
    await wrapper.find(".delete").trigger("keyup.delete");
    expect(wrapper.emitted("close")).toBeTruthy();
  });
});
