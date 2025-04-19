import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Progress from "../Progress.vue";

describe("Progress", () => {
    it("renders with default props", () => {
        const wrapper = mount(Progress);
        expect(wrapper.find(".progress-wrapper").exists()).toBe(true);
        expect(wrapper.find("progress").exists()).toBe(true);
        expect(wrapper.find("progress").classes()).toContain("is-darkgrey");
        expect(wrapper.find("progress").attributes("max")).toBe("100");
    });

    it("applies type class", () => {
        const wrapper = mount(Progress, {
            props: {
                type: "is-primary"
            }
        });
        expect(wrapper.find("progress").classes()).toContain("is-primary");
    });

    it("applies size class", () => {
        const wrapper = mount(Progress, {
            props: {
                size: "is-small"
            }
        });
        expect(wrapper.find("progress").classes()).toContain("is-small");
    });

    it("sets value and max attributes", () => {
        const wrapper = mount(Progress, {
            props: {
                value: 45,
                max: 200
            }
        });
        const progress = wrapper.find("progress");
        expect(progress.attributes("value")).toBe("45");
        expect(progress.attributes("max")).toBe("200");
    });

    it("shows value when showValue is true", () => {
        const wrapper = mount(Progress, {
            props: {
                value: 45,
                showValue: true
            }
        });
        expect(wrapper.find(".progress-value").exists()).toBe(true);
        expect(wrapper.find(".progress-value").text()).toBe("45");
    });

    it("formats value as percentage", () => {
        const wrapper = mount(Progress, {
            props: {
                value: 45,
                max: 200,
                showValue: true,
                format: "percent"
            }
        });
        expect(wrapper.find(".progress-value").text()).toBe("22.5%");
    });

    it("respects precision setting with keepTrailingZeroes", () => {
        const wrapper = mount(Progress, {
            props: {
                value: 45,
                max: 300,
                showValue: true,
                format: "percent",
                precision: 3,
                keepTrailingZeroes: true
            }
        });
        expect(wrapper.find(".progress-value").text()).toBe("15.000%");
    });

    it("keeps trailing zeroes when specified", () => {
        const wrapper = mount(Progress, {
            props: {
                value: 50,
                showValue: true,
                precision: 2,
                keepTrailingZeroes: true
            }
        });
        expect(wrapper.find(".progress-value").text()).toBe("50.00");
    });

    it("removes trailing zeroes by default", () => {
        const wrapper = mount(Progress, {
            props: {
                value: 50,
                showValue: true,
                precision: 2
            }
        });
        expect(wrapper.find(".progress-value").text()).toBe("50");
    });

    it("handles indeterminate state", () => {
        const wrapper = mount(Progress, {
            props: {
                value: undefined
            }
        });
        expect(wrapper.find("progress").attributes("value")).toBeUndefined();
    });

    it("adds more-than-half class when value is >= 50%", () => {
        const wrapper = mount(Progress, {
            props: {
                value: 75,
                max: 100,
                showValue: true
            }
        });
        expect(wrapper.find(".progress-value").classes()).toContain("more-than-half");
    });

    it("does not add more-than-half class when value is < 50%", () => {
        const wrapper = mount(Progress, {
            props: {
                value: 25,
                max: 100,
                showValue: true
            }
        });
        expect(wrapper.find(".progress-value").classes()).not.toContain("more-than-half");
    });

    it("renders slot content instead of value", () => {
        const wrapper = mount(Progress, {
            props: {
                value: 45,
                showValue: true
            },
            slots: {
                default: "Custom content"
            }
        });
        expect(wrapper.find(".progress-value").text()).toBe("Custom content");
    });

    it("handles invalid values in display", () => {
        const wrapper = mount(Progress, {
            props: {
                value: Number.NaN,
                showValue: true
            }
        });
        expect(wrapper.find(".progress-value").text()).toBe("");
    });

    it("handles decimal values correctly", () => {
        const wrapper = mount(Progress, {
            props: {
                value: 33.333333,
                showValue: true,
                precision: 2
            }
        });
        expect(wrapper.find(".progress-value").text()).toBe("33.33");
    });
}); 