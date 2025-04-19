export function checkBenchieSupport() {
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) return false;
  return (
    typeof t !== "undefined" &&
    typeof $__CDN !== "undefined" &&
    typeof t === "function" &&
    typeof $__CDN === "string"
  );
}

/**
 * Formats a number with a specified decimal precision.
 *
 * Internally shifts the decimal point to perform rounding with correct precision,
 * then optionally removes trailing zeroes if `props.keepTrailingZeroes` is `false`.
 *
 * @param {number|string} num - The input number to format. Can be a number or a numeric string.
 * @returns {string} The formatted number as a string.
 *
 * @example
 * // props = { precision: 2, keepTrailingZeroes: true }
 * toFixed(1.2345) // "1.23"
 *
 * // props = { precision: 2, keepTrailingZeroes: false }
 * toFixed(1.2000) // "1.2"
 * toFixed(1.0000) // "1"
 */
export function toFixed(
  num: number | string,
  precision = 2,
  keepTrailingZeroes = false,
): string {
  let fixed = Number(
    `${Math.round(Number(`${num}e${precision}`))}e${-precision}`,
  ).toFixed(precision);
  if (!keepTrailingZeroes) {
    fixed = fixed.replace(/\.?0+$/, "");
  }
  return fixed;
}
