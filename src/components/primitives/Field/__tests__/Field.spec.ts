import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Field from "../Field.vue";

describe("Field", () => {
    it("renders with default props", () => {
        const wrapper = mount(Field);
        expect(wrapper.find(".field").exists()).toBe(true);
    });

    it("renders label when provided", () => {
        const wrapper = mount(Field, {
            props: {
                label: "Test Label",
                labelFor: "test-input"
            }
        });
        const label = wrapper.find("label.label");
        expect(label.exists()).toBe(true);
        expect(label.text()).toBe("Test Label");
        expect(label.attributes("for")).toBe("test-input");
    });

    it("renders horizontal label correctly", () => {
        const wrapper = mount(Field, {
            props: {
                label: "Horizontal Label",
                horizontal: true,
                labelFor: "test-input"
            }
        });
        const fieldLabel = wrapper.find(".field-label");
        expect(fieldLabel.exists()).toBe(true);
        const label = fieldLabel.find("label.label");
        expect(label.text()).toBe("Horizontal Label");
        expect(label.attributes("for")).toBe("test-input");
        expect(wrapper.find(".field-body").exists()).toBe(true);
    });

    it("applies size class to field-label", () => {
        const wrapper = mount(Field, {
            props: {
                label: "Label",
                horizontal: true,
                size: "is-small"
            }
        });
        expect(wrapper.find(".field-label").classes()).toContain("is-small");
    });

    it("renders help message with type", () => {
        const wrapper = mount(Field, {
            props: {
                message: "Help text",
                type: "is-danger"
            }
        });
        const help = wrapper.find(".help");
        expect(help.exists()).toBe(true);
        expect(help.text()).toBe("Help text");
        expect(help.classes()).toContain("is-danger");
    });

    it("applies position class", () => {
        const wrapper = mount(Field, {
            props: {
                position: "is-centered"
            }
        });
        expect(wrapper.classes()).toContain("is-centered");
    });

    it("applies conditional classes correctly", () => {
        const wrapper = mount(Field, {
            props: {
                expanded: true,
                horizontal: true,
                grouped: true,
                groupMultiline: true,
                addons: true
            }
        });
        const classes = wrapper.find(".field").classes();
        expect(classes).toContain("is-expanded");
        expect(classes).toContain("is-horizontal");
        expect(classes).toContain("is-grouped");
        expect(classes).toContain("is-grouped-multiline");
        expect(classes).toContain("has-addons");
    });

    it("renders default slot content", () => {
        const wrapper = mount(Field, {
            slots: {
                default: "<div class='test-content'>Slot Content</div>"
            }
        });
        expect(wrapper.find(".test-content").exists()).toBe(true);
        expect(wrapper.find(".test-content").text()).toBe("Slot Content");
    });

    it("passes type as color prop to slot in non-horizontal mode", () => {
        const wrapper = mount(Field, {
            props: {
                type: "is-primary"
            },
            slots: {
                default: `<template #default="props">
                    <span class="type-test">{{ props.color }}</span>
                </template>`
            }
        });
        expect(wrapper.find(".type-test").text()).toBe("is-primary");
    });

    it("passes type as rounded prop to slot in horizontal mode", () => {
        const wrapper = mount(Field, {
            props: {
                horizontal: true,
                type: "is-primary"
            },
            slots: {
                default: `<template #default="props">
                    <span class="type-test">{{ props.rounded }}</span>
                </template>`
            }
        });
        expect(wrapper.find(".type-test").text()).toBe("is-primary");
    });
}); 