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
 * Formats a number with fixed decimal precision and optional trimming of trailing zeroes.
 *
 * @param num - The number to format (can be a number or numeric string).
 * @param precision - Number of digits after the decimal point (default: 2).
 * @param keepTrailingZeroes - Whether to keep trailing zeroes (default: false).
 * @returns Formatted number as a string.
 */
export function formatToFixed(
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

export const intOrParseInt = (num: number | string): number => {
  if (Number.isInteger(num)) {
    return num as number;
  }
  return Number.parseInt(num as string);
};

/**
 * Returns typed version of first element of array
 */
export function firstIfArray<T>(arr: T | T[]): T {
  return Array.isArray(arr) ? arr[0] : arr;
}
