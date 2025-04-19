import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import FileInput from "../FileInput.vue";

describe("FileInput", () => {
  it("file with name attr", () => {
    const wrapper = mount(FileInput, {
      attrs: {
        name: "upload-file",
      },
    });
    const file = wrapper.find('input[type="file"]');
    expect(file.exists()).toBeTruthy();

    const fileEl = file.element as HTMLInputElement;
    expect(fileEl.name).toBe("upload-file");
  });
});
