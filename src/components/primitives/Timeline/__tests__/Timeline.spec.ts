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

  it("renders stages with active, error and custom props", () => {
    const wrapper = mount(Timeline, {
      props: {
        stages: [
          {
            title: "Create Account",
            desc: "Start by creating your personal account to access all features.",
          },
          {
            title: "Complete profile",
            desc: "Fill out your profile with relevant information to attract employers.",
            error: true,
          },
          {
            title: "Apply to jobs",
            desc: "Browse listings and submit applications to jobs that match your skills.",
            active: true,
          },
          {
            title: "Go on a drinking binge",
            desc: "Take a break — you’ve earned it. (Not recommended before interviews.)",
          },
        ],
      },
      slots: {
        default: `<template #default="{ stage }">
                    <h1>{{ stage.title }}</h1>
                    <p>{{ stage.desc }}</p>
                  </template>`,
      },
    });

    const items = wrapper.findAll("li");
    expect(items).length(4);

    // check first stage
    expect(items[0].classes()).length(1);
    expect(items[0].classes()).contains("has-text-grey");
    expect(items[0].find("h1").text()).toBe("Create Account");
    expect(items[0].find("p").text()).toBe(
      "Start by creating your personal account to access all features.",
    );

    // check second stage
    expect(items[1].classes()).length(2);
    expect(items[1].classes()).contains("has-text-grey");
    expect(items[1].classes()).contains("has-text-danger");
    expect(items[1].find("h1").text()).toBe("Complete profile");
    expect(items[1].find("p").text()).toBe(
      "Fill out your profile with relevant information to attract employers.",
    );

    // check third stage
    expect(items[2].classes()).length(2);
    expect(items[2].classes()).contains("has-text-success");
    expect(items[2].classes()).contains("is-active");
    expect(items[2].find("h1").text()).toBe("Apply to jobs");
    expect(items[2].find("p").text()).toBe(
      "Browse listings and submit applications to jobs that match your skills.",
    );
  });
});
