import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Modal from "../Modal.vue";

describe("Modal", () => {
  it("updates v-model value on close button click", async () => {
    const wrapper = mount(Modal);

    // by default it active
    expect(wrapper.find(".modal").classes()).toContain("is-active");

    // click close button
    await wrapper.find(".modal-close").trigger("click");
    const emitted = wrapper.emitted("update:modelValue");
    expect(emitted).toHaveLength(1);
    expect(emitted?.[0]).toEqual([false]);

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
