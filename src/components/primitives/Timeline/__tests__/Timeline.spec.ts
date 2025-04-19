import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Timeline from "../Timeline.vue";

describe("Timeline", () => {
  it("renders with empty stages", () => {
    const wrapper = mount(Timeline, {
      props: {
        stages: [],
      },
    });
    const timeline = wrapper.find(".timeline");
    expect(timeline.exists()).toBe(true);
    expect(timeline.html({ raw: true })).toBe('<ol class="timeline"></ol>');
  });
});
