import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";

import Breadcrumb from "../Breadcrumb.vue";
import BreadcrumbItem from "../BreadcrumbItem.vue";

describe("Breadcrumb", () => {
    it("renders default breadcrumb", () => {
        const wrapper = mount(Breadcrumb, {
            slots: {
                default: () => [
                    h(BreadcrumbItem, null, () => "Home"),
                    h(BreadcrumbItem, null, () => "Components"),
                    h(BreadcrumbItem, { active: true }, () => "Breadcrumb"),
                ],
            },
        });

        expect(wrapper.find("nav.breadcrumb").exists()).toBe(true);
        expect(wrapper.findAll("li").length).toBe(3);
        expect(wrapper.find("li.is-active").exists()).toBe(true);
        expect(wrapper.find("li.is-active").text()).toBe("Breadcrumb");
    });

    it("applies alignment classes", () => {
        const centerWrapper = mount(Breadcrumb, { props: { alignment: "is-centered" } });
        expect(centerWrapper.find("nav.breadcrumb").classes()).toContain("is-centered");

        const rightWrapper = mount(Breadcrumb, { props: { alignment: "is-right" } });
        expect(rightWrapper.find("nav.breadcrumb").classes()).toContain("is-right");
    });

    it("applies separator classes", () => {
        const separators = [
            "has-arrow-separator",
            "has-bullet-separator",
            "has-dot-separator",
            "has-succeeds-separator",
        ];
        for (const separator of separators) {
            const wrapper = mount(Breadcrumb, { props: { separator } });
            expect(wrapper.find("nav.breadcrumb").classes()).toContain(separator);
        }
    });

    it("applies size classes", () => {
        const sizes = ["is-small", "is-medium", "is-large"];
        for (const size of sizes) {
            const wrapper = mount(Breadcrumb, { props: { size } });
            expect(wrapper.find("nav.breadcrumb").classes()).toContain(size);
        }
    });
});

describe("BreadcrumbItem", () => {
    it("renders default item with <a> tag", () => {
        const wrapper = mount(BreadcrumbItem, {
            slots: { default: () => "Link Item" },
            attrs: { href: "#test" },
        });
        const item = wrapper.find("li");
        const link = item.find("a");
        expect(item.exists()).toBe(true);
        expect(link.exists()).toBe(true);
        expect(link.text()).toBe("Link Item");
        expect(link.attributes("href")).toBe("#test");
        expect(item.classes()).not.toContain("is-active");
    });

    it("renders item with custom tag", () => {
        const wrapper = mount(BreadcrumbItem, {
            props: { tag: "span" },
            slots: { default: () => "Span Item" },
        });
        const item = wrapper.find("li");
        expect(item.find("span").exists()).toBe(true);
        expect(item.find("span").text()).toBe("Span Item");
    });

    it("renders active item", () => {
        const wrapper = mount(BreadcrumbItem, {
            props: { active: true },
            slots: { default: () => "Active Item" },
        });
        const item = wrapper.find("li");
        expect(item.classes()).toContain("is-active");
        expect(item.find("a").exists()).toBe(true);
        expect(item.text()).toBe("Active Item");
    });

    it("renders active item with custom tag", () => {
        const wrapper = mount(BreadcrumbItem, {
            props: { active: true, tag: "p" },
            slots: { default: () => "Active Paragraph" },
        });
        const item = wrapper.find("li");
        expect(item.classes()).toContain("is-active");
        expect(item.find("p").exists()).toBe(true);
        expect(item.find("p").text()).toBe("Active Paragraph");
    });
}); 