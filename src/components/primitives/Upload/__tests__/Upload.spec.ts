import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Upload from "../Upload.vue";

describe("Upload", () => {
  it("renders with default props", () => {
    const wrapper = mount(Upload);
    expect(wrapper.find(".file").exists()).toBe(true);
    expect(wrapper.find('input[type="file"]').exists()).toBe(true);
  });

  it("handles file upload", async () => {
    const wrapper = mount(Upload);
    const input = wrapper.find('input[type="file"]');

    // emulate file selection
    const file = new File(["hello"], "hello.txt", { type: "text/plain" });

    Object.defineProperty(input.element, "files", {
      value: [file],
      writable: false,
    });

    input.element.dispatchEvent(new Event("change"));

    // check event
    const emitted = wrapper.emitted("update:modelValue");
    expect(emitted).toBeTruthy();
    expect(emitted).length(1);

    // check emitted file
    const emittedFile = emitted?.[0][0];
    expect(emittedFile).toBeInstanceOf(File);

    // check name
    expect((emittedFile as File).name).toBe("hello.txt");

    // check MIME type
    expect((emittedFile as File).type).toBe("text/plain");

    // check content
    expect((emittedFile as File).size).toBe(5); // 5 bytes
  });
});
