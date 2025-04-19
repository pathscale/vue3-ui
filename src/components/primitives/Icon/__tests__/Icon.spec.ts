import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Icon from "../Icon.vue";

describe("Icon", () => {
  it("basic icon render", () => {
    const wrapper = mount(Icon, {
      props: {
        name: "github-icon",
        bundle: "icons",
      },
    });
    expect(wrapper.html({ raw: true })).toContain(
      '<span class="icon"><svg height="100%" width="100%" class=""><use href="/icons.svg?v=1.0.0#github-icon"></use></svg></span>',
    );
  });
});
