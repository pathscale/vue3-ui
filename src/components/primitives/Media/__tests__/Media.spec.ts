import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";
import Media from "../Media.vue";

describe("Media", () => {
  it("renders default media", () => {
    const wrapper = mount(Media);
    expect(wrapper.find(".media").exists()).toBe(true);
    expect(wrapper.find(".media-left").exists()).toBe(true);
    expect(wrapper.find(".media-content").exists()).toBe(true);
    expect(wrapper.find(".media-right").exists()).toBe(true);
  });

  it("renders left slot content", () => {
    const wrapper = mount(Media, {
      slots: {
        left: "<figure class='image'><img src='test.jpg' alt='Test'/></figure>",
      },
    });
    const leftSection = wrapper.find(".media-left");
    expect(leftSection.find(".image").exists()).toBe(true);
    expect(leftSection.find("img").attributes("src")).toBe("test.jpg");
  });

  it("renders content slot", () => {
    const wrapper = mount(Media, {
      slots: {
        content: `
                    <div class="content">
                        <p><strong>John Smith</strong></p>
                        <p>Lorem ipsum dolor sit amet</p>
                    </div>
                `,
      },
    });
    const content = wrapper.find(".media-content");
    expect(content.find(".content").exists()).toBe(true);
    expect(content.find("strong").text()).toBe("John Smith");
  });

  it("renders right slot content", () => {
    const wrapper = mount(Media, {
      slots: {
        right: "<button class='delete'></button>",
      },
    });
    const rightSection = wrapper.find(".media-right");
    expect(rightSection.find(".delete").exists()).toBe(true);
  });

  it("renders all slots simultaneously", () => {
    const wrapper = mount(Media, {
      slots: {
        left: "<figure class='image'><img src='avatar.jpg' alt='Avatar'/></figure>",
        content: "<div class='content'><p>Main content</p></div>",
        right: "<button>Action</button>",
      },
    });

    expect(wrapper.find(".media-left img").exists()).toBe(true);
    expect(wrapper.find(".media-content .content").exists()).toBe(true);
    expect(wrapper.find(".media-right button").exists()).toBe(true);
  });

  it("renders nested media components", () => {
    const wrapper = mount(Media, {
      slots: {
        content: h("div", [
          h("p", "Parent content"),
          h("div", { class: "nested-media" }, [
            h(Media, {
              slots: {
                left: h("figure", { class: "image" }, [
                  h("img", { src: "nested.jpg", alt: "Nested" }),
                ]),
                content: h("div", { class: "content" }, [
                  h("p", "Nested content"),
                ]),
              },
            }),
          ]),
        ]),
      },
    });

    expect(wrapper.findAll(".media")).toHaveLength(2);
    expect(wrapper.find(".nested-media").exists()).toBe(true);
  });

  it("preserves content structure", () => {
    const wrapper = mount(Media, {
      slots: {
        content: `
                    <div class="content">
                        <p class="title">Article Title</p>
                        <p class="subtitle">Article Subtitle</p>
                        <div class="text">Article content</div>
                    </div>
                `,
      },
    });

    const content = wrapper.find(".media-content .content");
    expect(content.find(".title").text()).toBe("Article Title");
    expect(content.find(".subtitle").text()).toBe("Article Subtitle");
    expect(content.find(".text").text()).toBe("Article content");
  });

  it("handles empty slots gracefully", () => {
    const wrapper = mount(Media);
    expect(wrapper.find(".media-left").text()).toBe("");
    expect(wrapper.find(".media-content").text()).toBe("");
    expect(wrapper.find(".media-right").text()).toBe("");
  });
});
