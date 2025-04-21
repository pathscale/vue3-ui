import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import Icon from "../Icon.vue";

describe("Icon", () => {
  it("console logging warns if required props are missing", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    mount(Icon); // without required props

    expect(consoleWarnSpy).toHaveBeenCalled();
    expect(consoleWarnSpy.mock.calls[0][0]).toBe(
      '[Vue warn]: Missing required prop: "name"',
    );
    expect(consoleWarnSpy.mock.calls[1][0]).toBe(
      '[Vue warn]: Missing required prop: "bundle"',
    );

    consoleWarnSpy.mockRestore();
  });

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
