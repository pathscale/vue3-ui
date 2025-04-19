import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";
import Card from "../Card.vue";
import CardContent from "../CardContent.vue";
import CardFooter from "../CardFooter.vue";
import CardFooterItem from "../CardFooterItem.vue";
import CardHeader from "../CardHeader.vue";
import CardImage from "../CardImage.vue";

describe("Card", () => {
  it("renders default card", () => {
    const wrapper = mount(Card);
    expect(wrapper.find(".card").exists()).toBe(true);
  });

  it("renders with custom tag", () => {
    const wrapper = mount(Card, {
      props: {
        tag: "article",
      },
    });
    expect(wrapper.find("article.card").exists()).toBe(true);
  });

  it("renders content in slot", () => {
    const wrapper = mount(Card, {
      slots: {
        default: "Card content",
      },
    });
    expect(wrapper.text()).toBe("Card content");
  });

  it("renders with all card components", () => {
    const wrapper = mount(Card, {
      slots: {
        default: [
          h(CardHeader, { title: "Header" }),
          h(CardImage, null, () => h("img", { src: "test.jpg", alt: "Test" })),
          h(CardContent, null, () => "Content"),
          h(CardFooter, null, () => [
            h(CardFooterItem, null, () => "Footer Item 1"),
            h(CardFooterItem, null, () => "Footer Item 2"),
          ]),
        ],
      },
      global: {
        components: {
          CardHeader,
          CardImage,
          CardContent,
          CardFooter,
          CardFooterItem,
        },
      },
    });

    expect(wrapper.find(".card-header").exists()).toBe(true);
    expect(wrapper.find(".card-header-title").text()).toBe("Header");
    expect(wrapper.find(".card-image").exists()).toBe(true);
    expect(wrapper.find("img").attributes()).toEqual({
      src: "test.jpg",
      alt: "Test",
    });
    expect(wrapper.find(".card-content").exists()).toBe(true);
    expect(wrapper.find(".card-content").text()).toBe("Content");
    expect(wrapper.find(".card-footer").exists()).toBe(true);
    expect(wrapper.findAll(".card-footer-item")).toHaveLength(2);
  });
});

describe("CardHeader", () => {
  it("renders default header", () => {
    const wrapper = mount(CardHeader);
    expect(wrapper.find(".card-header").exists()).toBe(true);
  });

  it("renders with title prop", () => {
    const wrapper = mount(CardHeader, {
      props: {
        title: "Card Title",
      },
    });
    expect(wrapper.find(".card-header-title").text()).toBe("Card Title");
  });

  it("renders with custom tag", () => {
    const wrapper = mount(CardHeader, {
      props: {
        tag: "div",
      },
    });
    expect(wrapper.find("div.card-header").exists()).toBe(true);
  });

  it("renders slot content", () => {
    const wrapper = mount(CardHeader, {
      slots: {
        default: "Custom header content",
      },
    });
    expect(wrapper.text()).toBe("Custom header content");
  });
});

describe("CardContent", () => {
  it("renders default content", () => {
    const wrapper = mount(CardContent);
    expect(wrapper.find(".card-content").exists()).toBe(true);
  });

  it("renders slot content", () => {
    const wrapper = mount(CardContent, {
      slots: {
        default: "Content text",
      },
    });
    expect(wrapper.text()).toBe("Content text");
  });
});

describe("CardImage", () => {
  it("renders default image container", () => {
    const wrapper = mount(CardImage);
    expect(wrapper.find(".card-image").exists()).toBe(true);
  });

  it("renders with image slot", () => {
    const wrapper = mount(CardImage, {
      slots: {
        default: h("img", { src: "test.jpg", alt: "Test" }),
      },
    });
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("test.jpg");
    expect(img.attributes("alt")).toBe("Test");
  });
});

describe("CardFooter", () => {
  it("renders default footer", () => {
    const wrapper = mount(CardFooter);
    expect(wrapper.find(".card-footer").exists()).toBe(true);
  });

  it("renders with custom tag", () => {
    const wrapper = mount(CardFooter, {
      props: {
        tag: "div",
      },
    });
    expect(wrapper.find("div.card-footer").exists()).toBe(true);
  });

  it("renders footer items", () => {
    const wrapper = mount(CardFooter, {
      slots: {
        default: [
          h(CardFooterItem, null, () => "Item 1"),
          h(CardFooterItem, null, () => "Item 2"),
        ],
      },
      global: {
        components: {
          CardFooterItem,
        },
      },
    });
    const items = wrapper.findAll(".card-footer-item");
    expect(items).toHaveLength(2);
    expect(items[0].text()).toBe("Item 1");
    expect(items[1].text()).toBe("Item 2");
  });
});

describe("CardFooterItem", () => {
  it("renders default footer item", () => {
    const wrapper = mount(CardFooterItem);
    expect(wrapper.find(".card-footer-item").exists()).toBe(true);
  });

  it("renders slot content", () => {
    const wrapper = mount(CardFooterItem, {
      slots: {
        default: "Footer item content",
      },
    });
    expect(wrapper.text()).toBe("Footer item content");
  });
});
