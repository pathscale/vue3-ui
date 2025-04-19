import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";
import Menu from "../Menu.vue";
import MenuList from "../MenuList.vue";
import MenuItem from "../MenuItem.vue";

describe("Menu", () => {
    it("renders menu wrapper", () => {
        const wrapper = mount(Menu);
        expect(wrapper.find(".menu").exists()).toBe(true);
    });

    it("renders menu with content", () => {
        const wrapper = mount(Menu, {
            slots: {
                default: () => h(MenuList, null, () => h(MenuItem, null, () => "Item")),
            },
        });
        expect(wrapper.find(".menu").exists()).toBe(true);
        expect(wrapper.find(".menu-list").exists()).toBe(true);
        expect(wrapper.text()).toBe("Item");
    });
});

describe("MenuList", () => {
    it("renders menu list without label", () => {
        const wrapper = mount(MenuList);
        expect(wrapper.find(".menu-list").exists()).toBe(true);
        expect(wrapper.find(".menu-label").exists()).toBe(false);
    });

    it("renders menu list with label", () => {
        const wrapper = mount(MenuList, {
            props: { label: "Main Menu" },
        });
        expect(wrapper.find(".menu-label").exists()).toBe(true);
        expect(wrapper.find(".menu-label").text()).toBe("Main Menu");
    });

    it("applies aria role", () => {
        const wrapper = mount(MenuList, {
            props: { ariaRole: "menu" },
        });
        expect(wrapper.find(".menu-list").attributes("role")).toBe("menu");
    });

    it("renders menu items", () => {
        const wrapper = mount(MenuList, {
            slots: {
                default: () => [
                    h(MenuItem, null, () => "Item 1"),
                    h(MenuItem, null, () => "Item 2"),
                ],
            },
        });
        expect(wrapper.findAll("li").length).toBe(2);
    });
});

describe("MenuItem", () => {
    it("renders default menu item", () => {
        const wrapper = mount(MenuItem, {
            slots: { default: () => "Menu Item" },
        });
        expect(wrapper.find("li").exists()).toBe(true);
        expect(wrapper.text()).toBe("Menu Item");
    });

    it("renders with label prop", () => {
        const wrapper = mount(MenuItem, {
            props: { label: "Menu Item" },
        });
        expect(wrapper.text()).toBe("Menu Item");
    });

    it("renders with icon", () => {
        const wrapper = mount(MenuItem, {
            props: { icon: "🔍", label: "Search" },
        });
        expect(wrapper.find(".is-flex").exists()).toBe(true);
        expect(wrapper.text()).toContain("🔍");
        expect(wrapper.text()).toContain("Search");
    });

    it("applies state classes", () => {
        const wrapper = mount(MenuItem, {
            props: {
                active: true,
                disabled: true,
            },
        });
        const item = wrapper.find("a");
        expect(item.classes()).toContain("is-active");
        expect(item.classes()).toContain("is-disabled");
    });

    it("emits events on click when not disabled", async () => {
        const wrapper = mount(MenuItem, {
            props: {
                active: true,
                expanded: false,
            },
        });
        await wrapper.find("a").trigger("click");
        expect(wrapper.emitted("update:expanded")?.[0]).toEqual([true]);
        expect(wrapper.emitted("update:active")?.[0]).toEqual([true]);
    });

    it("does not emit events when disabled", async () => {
        const wrapper = mount(MenuItem, {
            props: {
                disabled: true,
                expanded: false,
            },
        });
        await wrapper.find("a").trigger("click");
        expect(wrapper.emitted("update:expanded")).toBeFalsy();
        expect(wrapper.emitted("update:active")).toBeFalsy();
    });

    it("renders submenu when expanded", async () => {
        const wrapper = mount(MenuItem, {
            props: { expanded: true },
            slots: {
                default: () => h(MenuItem, null, () => "Submenu Item"),
            },
        });
        expect(wrapper.find("ul").isVisible()).toBe(true);
        expect(wrapper.text()).toContain("Submenu Item");
    });

    it("hides submenu when not expanded", async () => {
        const wrapper = mount(MenuItem, {
            props: { expanded: false },
            slots: {
                default: () => h(MenuItem, null, () => "Submenu Item"),
            },
        });
        expect(wrapper.find("ul").isVisible()).toBe(false);
    });

    it("uses custom tag", () => {
        const wrapper = mount(MenuItem, {
            props: { tag: "button" },
        });
        expect(wrapper.find("button").exists()).toBe(true);
    });

    it("applies aria role", () => {
        const wrapper = mount(MenuItem, {
            props: { ariaRole: "menuitem" },
        });
        expect(wrapper.find("li").attributes("role")).toBe("menuitem");
    });
}); 