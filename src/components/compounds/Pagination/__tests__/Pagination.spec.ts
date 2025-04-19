import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Pagination from "../Pagination.vue";

describe("Pagination", () => {
    it("renders with default props", () => {
        const wrapper = mount(Pagination, {
            props: {
                total: 100
            }
        });
        expect(wrapper.find("nav").exists()).toBe(true);
        expect(wrapper.find(".pagination-previous").exists()).toBe(true);
        expect(wrapper.find(".pagination-next").exists()).toBe(true);
        expect(wrapper.findAll(".pagination-link").length).toBe(5);
    });

    it("calculates pages correctly", () => {
        const wrapper = mount(Pagination, {
            props: {
                total: 100,
                perPage: 20,
                current: 1
            }
        });
        expect(wrapper.findAll(".pagination-link").length).toBe(5);
    });

    it("handles navigation", async () => {
        const wrapper = mount(Pagination, {
            props: {
                total: 100,
                perPage: 20,
                current: 1
            }
        });

        await wrapper.find(".pagination-next").trigger("click");
        expect(wrapper.emitted("update:current")?.[0]).toEqual([2]);
        expect(wrapper.emitted("change")?.[0]).toEqual([2]);
    });

    it("disables previous button on first page", () => {
        const wrapper = mount(Pagination, {
            props: {
                total: 100,
                perPage: 20,
                current: 1
            }
        });
        expect(wrapper.find(".pagination-previous").attributes("disabled")).toBeDefined();
    });

    it("disables next button on last page", () => {
        const wrapper = mount(Pagination, {
            props: {
                total: 100,
                perPage: 20,
                current: 5
            }
        });
        expect(wrapper.find(".pagination-next").attributes("disabled")).toBeDefined();
    });

    it("shows simple view when simple prop is true", () => {
        const wrapper = mount(Pagination, {
            props: {
                total: 100,
                perPage: 20,
                current: 2,
                simple: true
            }
        });
        expect(wrapper.find(".info").exists()).toBe(true);
        expect(wrapper.find(".info").text()).toBe("21-40 / 100");
    });

    it("applies style props correctly", () => {
        const wrapper = mount(Pagination, {
            props: {
                total: 100,
                size: "is-small",
                rounded: true,
                order: "is-centered"
            }
        });
        const nav = wrapper.find("nav");
        expect(nav.classes()).toContain("is-small");
        expect(nav.classes()).toContain("is-rounded");
        expect(nav.classes()).toContain("is-centered");
    });

    it("handles range props correctly", () => {
        const wrapper = mount(Pagination, {
            props: {
                total: 200,
                current: 5,
                rangeBefore: 2,
                rangeAfter: 2,
                perPage: 20
            }
        });
        const links = wrapper.findAll(".pagination-link");
        const numbers = links.map(link => link.text());
        expect(numbers).toContain("1");
        expect(numbers).toContain("3");
        expect(numbers).toContain("4");
        expect(numbers).toContain("5");
        expect(numbers).toContain("6");
        expect(numbers).toContain("7");
        expect(numbers).toContain("10");
    });

    it("handles aria labels correctly", () => {
        const wrapper = mount(Pagination, {
            props: {
                total: 100,
                current: 2,
                ariaNextLabel: "Next page",
                ariaPreviousLabel: "Previous page",
                ariaPageLabel: "Page",
                ariaCurrentLabel: "Current"
            }
        });
        expect(wrapper.find(".pagination-next").attributes("aria-label")).toBe("Next page");
        expect(wrapper.find(".pagination-previous").attributes("aria-label")).toBe("Previous page");
        const currentPage = wrapper.find(".pagination-link.is-current");
        expect(currentPage.attributes("aria-label")).toBe("Current, Page 2.");
    });
}); 