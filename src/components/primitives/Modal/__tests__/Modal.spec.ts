import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Modal from "../Modal.vue";

describe("Modal", () => {
  it("updates v-model value", async () => {
    const wrapper = mount(Modal);

    // by default it active
    expect(wrapper.find(".modal").classes()).toContain("is-active");

    // click close button
    await wrapper.find(".modal-close").trigger("click");
    const modelValueEvent = wrapper.emitted("update:modelValue");
    expect(modelValueEvent).toHaveLength(1);
    // @ts-ignore
    expect(modelValueEvent[0]).toEqual([false]);

    // 'is-active' class removed
    expect(wrapper.find(".modal").classes()).not.toContain("is-active");
  });

  it("reacts to v-model prop changes", async () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: false,
      },
    });

    // invisible
    expect(wrapper.find(".modal").classes()).not.toContain("is-active");

    // @ts-ignore
    await wrapper.setProps({ modelValue: true });

    // visible
    expect(wrapper.find(".modal").classes()).toContain("is-active");
  });
});
