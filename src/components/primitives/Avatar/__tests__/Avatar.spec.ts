import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import Avatar from "../Avatar.vue";

vi.mock("@/utils/functions", () => ({
    checkBenchieSupport: () => false,
}));

describe("Avatar", () => {
    it("renders with default props", () => {
        const wrapper = mount(Avatar);
        expect(wrapper.classes()).toContain("is-64x64");
        expect(wrapper.classes()).toContain("has-background-link");
        expect(wrapper.classes()).toContain("has-text-white");
    });

    it("renders image when src is provided", () => {
        const src = "https://example.com/avatar.jpg";
        const wrapper = mount(Avatar, {
            props: {
                src,
                alt: "Test Avatar",
            },
        });

        const img = wrapper.find("img");
        expect(img.exists()).toBe(true);
        expect(img.attributes("src")).toBe(src);
        expect(img.attributes("alt")).toBe("Test Avatar");
    });

    it("renders caption when no src is provided", () => {
        const wrapper = mount(Avatar, {
            props: {
                alt: "John Doe",
            },
        });

        const span = wrapper.find("span");
        expect(span.exists()).toBe(true);
        expect(span.text()).toBe("JD");
    });

    it("applies correct size class", () => {
        const wrapper = mount(Avatar, {
            props: {
                size: "is-128x128",
            },
        });

        expect(wrapper.classes()).toContain("is-128x128");
    });

    it("applies rounded class when rounded is true", () => {
        const wrapper = mount(Avatar, {
            props: {
                src: "https://example.com/avatar.jpg",
                rounded: true,
            },
        });

        const img = wrapper.find("img");
        expect(img.classes()).toContain("is-rounded");
    });

    it("applies custom background and text colors", () => {
        const wrapper = mount(Avatar, {
            props: {
                background: "has-background-primary",
                text: "has-text-black",
            },
        });

        expect(wrapper.classes()).toContain("has-background-primary");
        expect(wrapper.classes()).toContain("has-text-black");
    });

    it("applies custom class to image", () => {
        const wrapper = mount(Avatar, {
            props: {
                src: "https://example.com/avatar.jpg",
                customClass: "custom-avatar",
            },
        });

        const img = wrapper.find("img");
        expect(img.classes()).toContain("custom-avatar");
    });

    it("sets data-src attribute when provided", () => {
        const dataSrc = "avatar/123";
        const wrapper = mount(Avatar, {
            props: {
                dataSrc,
            },
        });

        const img = wrapper.find("img");
        expect(img.attributes("data-src")).toBe(dataSrc);
    });
}); 