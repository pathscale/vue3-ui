import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import FileInput from "../FileInput.vue";

describe("FileInput", () => {
  it("file input with attributes", () => {
    const wrapper = mount(FileInput, {
      attrs: {
        name: "upload-file",
        accept: "image/png, image/jpeg",
        multiple: true,
        disabled: true,
      },
    });
    const file = wrapper.find('input[type="file"]');
    expect(file.exists()).toBeTruthy();

    const fileEl = file.element as HTMLInputElement;
    expect(fileEl.name).toBe("upload-file");
    expect(fileEl.accept).toBe("image/png, image/jpeg");
    expect(fileEl.multiple).toBe(true);
    expect(fileEl.disabled).toBe(true);
  });
});
