import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";
import Column from "../Column.vue";
import Columns from "../Columns.vue";

describe("Columns", () => {
  it("renders default columns", () => {
    const wrapper = mount(Columns);
    expect(wrapper.find(".columns").exists()).toBe(true);
  });

  it("renders columns with content", () => {
    const wrapper = mount(Columns, {
      slots: {
        default: "<div>Column content</div>",
      },
    });
    expect(wrapper.text()).toBe("Column content");
  });

  it("applies responsive classes", () => {
    const wrapper = mount(Columns, {
      props: {
        mobile: true,
        desktop: true,
      },
    });
    const columns = wrapper.find(".columns");
    expect(columns.classes()).toContain("is-mobile");
    expect(columns.classes()).toContain("is-desktop");
  });

  it("applies gap classes", () => {
    const wrapper = mount(Columns, {
      props: {
        gap: "is-1",
        gapless: true,
      },
    });
    const columns = wrapper.find(".columns");
    expect(columns.classes()).toContain("is-1");
    expect(columns.classes()).toContain("is-gapless");
    expect(columns.classes()).toContain("is-variable");
  });

  it("applies alignment classes", () => {
    const wrapper = mount(Columns, {
      props: {
        vcentered: true,
        hcentered: true,
        multiline: true,
      },
    });
    const columns = wrapper.find(".columns");
    expect(columns.classes()).toContain("is-vcentered");
    expect(columns.classes()).toContain("is-centered");
    expect(columns.classes()).toContain("is-multiline");
  });

  it("renders with nested columns", () => {
    const wrapper = mount(Columns, {
      slots: {
        default: [
          h(Column, null, () => "Column 1"),
          h(Column, null, () => "Column 2"),
          h(Column, null, () => "Column 3"),
        ],
      },
      global: {
        components: {
          Column,
        },
      },
    });

    expect(wrapper.findAllComponents(Column)).toHaveLength(3);
    expect(wrapper.findAll(".column")).toHaveLength(3);
  });
});

describe("Column", () => {
  it("renders default column", () => {
    const wrapper = mount(Column);
    expect(wrapper.find(".column").exists()).toBe(true);
  });

  it("renders column with content", () => {
    const wrapper = mount(Column, {
      slots: {
        default: "Column content",
      },
    });
    expect(wrapper.text()).toBe("Column content");
  });

  it("applies size class", () => {
    const wrapper = mount(Column, {
      props: {
        size: "is-4",
      },
    });
    expect(wrapper.classes()).toContain("is-4");
  });

  it("applies offset class", () => {
    const wrapper = mount(Column, {
      props: {
        offset: "is-offset-3",
      },
    });
    expect(wrapper.classes()).toContain("is-offset-3");
  });

  it("applies narrow classes", () => {
    const wrapper = mount(Column, {
      props: {
        narrow: true,
        narrowBreakpoint: "is-narrow-mobile",
      },
    });
    expect(wrapper.classes()).toContain("is-narrow");
    expect(wrapper.classes()).toContain("is-narrow-mobile");
  });

  it("combines multiple props", () => {
    const wrapper = mount(Column, {
      props: {
        size: "is-6",
        offset: "is-offset-2",
        narrow: true,
        narrowBreakpoint: "is-narrow-tablet",
      },
    });
    const classes = wrapper.classes();
    expect(classes).toContain("is-6");
    expect(classes).toContain("is-offset-2");
    expect(classes).toContain("is-narrow");
    expect(classes).toContain("is-narrow-tablet");
  });
});
