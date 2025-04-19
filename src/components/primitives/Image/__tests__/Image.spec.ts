import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import Image from "../Image.vue";

vi.mock("@/utils/functions", () => ({
  checkBenchieSupport: vi.fn(() => false),
}));

describe("Image", () => {
  it("renders default image", () => {
    const wrapper = mount(Image);
    expect(wrapper.find(".image").exists()).toBe(true);
    expect(wrapper.find("img").exists()).toBe(true);
  });

  it("applies size class", () => {
    const wrapper = mount(Image, {
      props: {
        size: "is-128x128",
      },
    });
    expect(wrapper.find(".image").classes()).toContain("is-128x128");
  });

  it("applies radio class", () => {
    const wrapper = mount(Image, {
      props: {
        radio: "is-square",
      },
    });
    expect(wrapper.find(".image").classes()).toContain("is-square");
  });

  it("applies rounded class to img", () => {
    const wrapper = mount(Image, {
      props: {
        rounded: true,
      },
    });
    expect(wrapper.find("img").classes()).toContain("is-rounded");
  });

  it("centers the image when centered prop is true", () => {
    const wrapper = mount(Image, {
      props: {
        centered: true,
      },
    });
    expect(wrapper.find(".image").classes()).toContain("container");
  });

  it("sets src attribute from props", () => {
    const src = "test-image.jpg";
    const wrapper = mount(Image, {
      props: { src },
    });
    expect(wrapper.find("img").attributes("src")).toBe(src);
  });

  it("sets data-src attribute from props", () => {
    const dataSrc = "test-image.jpg";
    const wrapper = mount(Image, {
      props: { dataSrc },
    });
    expect(wrapper.find("img").attributes("data-src")).toBe(dataSrc);
  });

  it("applies custom class to img", () => {
    const customClass = "custom-image";
    const wrapper = mount(Image, {
      props: { customClass },
    });
    expect(wrapper.find("img").classes()).toContain(customClass);
  });

  it("passes through attributes to img element", () => {
    const wrapper = mount(Image, {
      attrs: {
        alt: "Test image",
        loading: "lazy",
      },
    });
    const img = wrapper.find("img");
    expect(img.attributes("alt")).toBe("Test image");
    expect(img.attributes("loading")).toBe("lazy");
  });

  it("handles multiple props simultaneously", () => {
    const wrapper = mount(Image, {
      props: {
        size: "is-64x64",
        rounded: true,
        centered: true,
        customClass: "custom-image",
        src: "test.jpg",
      },
    });

    const figure = wrapper.find(".image");
    const img = wrapper.find("img");

    expect(figure.classes()).toContain("is-64x64");
    expect(figure.classes()).toContain("container");
    expect(img.classes()).toContain("is-rounded");
    expect(img.classes()).toContain("custom-image");
    expect(img.attributes("src")).toBe("test.jpg");
  });

  it("uses dataSrc as source when src is not provided", () => {
    const dataSrc = "test-image.jpg";
    const wrapper = mount(Image, {
      props: { dataSrc },
    });
    expect(wrapper.find("img").attributes("src")).toBe(dataSrc);
  });

  it("prioritizes src over dataSrc for source", () => {
    const src = "primary.jpg";
    const dataSrc = "fallback.jpg";
    const wrapper = mount(Image, {
      props: { src, dataSrc },
    });
    expect(wrapper.find("img").attributes("src")).toBe(src);
  });
});
