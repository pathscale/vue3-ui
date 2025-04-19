import { describe, expect, it } from "vitest";
import { formatToFixed } from "./functions";

describe("functions", () => {
  it("formatted to fixed", () => {
    expect(formatToFixed(1.2345)).toBe("1.23");
    expect(formatToFixed("1.2000", 2, false)).toBe("1.2");
    expect(formatToFixed("1.2000", 2, true)).toBe("1.20");
    expect(formatToFixed(1, 2, false)).toBe("1");
    expect(formatToFixed(1, 4, true)).toBe("1.0000");
  });
});
