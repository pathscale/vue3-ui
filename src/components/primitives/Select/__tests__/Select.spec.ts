import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import Select from "../Select.vue";


describe("Select", () => {
    it("renders default select", () => {
        const wrapper = mount(Select);
        expect(wrapper.find(".control").exists()).toBe(true);
        expect(wrapper.find(".select").exists()).toBe(true);
        expect(wrapper.find("select").exists()).toBe(true);
    });

    it("renders placeholder option when provided", () => {
        const wrapper = mount(Select, {
            props: {
                placeholder: "Select an option",
                modelValue: null
            } as const
        });
        const placeholderOption = wrapper.find("option");
        expect(placeholderOption.text()).toBe("Select an option");
        expect(placeholderOption.attributes("disabled")).toBeDefined();
        expect(placeholderOption.attributes("hidden")).toBeDefined();
    });

    it("applies size classes", () => {
        const wrapper = mount(Select, {
            props: {
                size: "is-small"
            } as const
        });
        expect(wrapper.find(".select").classes()).toContain("is-small");
    });

    it("applies state classes", () => {
        const wrapper = mount(Select, {
            props: {
                expanded: true,
                loading: true,
                multiple: true,
                rounded: true,
                color: "is-primary"
            } as const
        });
        const control = wrapper.find(".control");
        const select = wrapper.find(".select");

        expect(control.classes()).toContain("is-expanded");
        expect(select.classes()).toContain("is-fullwidth");
        expect(select.classes()).toContain("is-loading");
        expect(select.classes()).toContain("is-multiple");
        expect(select.classes()).toContain("is-rounded");
        expect(select.classes()).toContain("is-primary");
    });

    it("sets native size attribute", () => {
        const wrapper = mount(Select, {
            props: {
                nativeSize: 5
            } as const
        });
        expect(wrapper.find("select").attributes("size")).toBe("5");
    });

    it("handles v-model correctly", async () => {
        const wrapper = mount(Select, {
            props: {
                modelValue: "initial"
            } as const,
            slots: {
                default: `
                    <option value="initial">Initial</option>
                    <option value="changed">Changed</option>
                `
            }
        });

        expect(wrapper.find("select").element.value).toBe("initial");

        const select = wrapper.find("select");
        await select.setValue("changed");
        await nextTick();
        await nextTick();

        const emittedEvents = wrapper.emitted("update:modelValue");
        expect(emittedEvents).toBeTruthy();
        expect(emittedEvents?.[emittedEvents.length - 1]).toEqual(["changed"]);
    });

    it("emits blur event", async () => {
        const wrapper = mount(Select);
        await wrapper.find("select").trigger("blur");
        expect(wrapper.emitted("blur")).toBeTruthy();
    });

    it("emits focus event", async () => {
        const wrapper = mount(Select);
        await wrapper.find("select").trigger("focus");
        expect(wrapper.emitted("focus")).toBeTruthy();
    });

    it("handles multiple selection", async () => {
        const wrapper = mount(Select, {
            props: {
                modelValue: [],
                multiple: true
            } as const,
            slots: {
                default: `
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                `
            }
        });

        const select = wrapper.find("select");
        expect(select.attributes("multiple")).toBeDefined();

        await select.setValue(["1", "2"]);
        await nextTick();
        await nextTick();

        const emittedEvents = wrapper.emitted("update:modelValue");
        expect(emittedEvents).toBeTruthy();
        expect(emittedEvents?.[emittedEvents.length - 1]).toEqual([["1", "2"]]);
    });

    it("updates when modelValue prop changes", async () => {
        const wrapper = mount(Select, {
            props: {
                modelValue: "initial"
            } as const,
            slots: {
                default: `
                    <option value="initial">Initial</option>
                    <option value="updated">Updated</option>
                `
            }
        });
        // @ts-expect-error
        await wrapper.setProps({ modelValue: "updated" });
        await nextTick();
        await nextTick();

        expect(wrapper.find("select").element.value).toBe("updated");
    });

    it("inherits attributes", () => {
        const wrapper = mount(Select, {
            attrs: {
                name: "test-select",
                required: true
            }
        });
        const select = wrapper.find("select");
        expect(select.attributes("name")).toBe("test-select");
        expect(select.attributes("required")).toBeDefined();
    });
}); 