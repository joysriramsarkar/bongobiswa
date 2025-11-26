/**
 * bengali.ts - Bengali Language Utilities
 * This file contains helper functions for Bengali language processing,
 * such as number conversion and date formatting.
 */

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/**
 * Converts an English number (or a string representation of a number) to its Bengali equivalent.
 * @param number - The number to convert.
 * @returns A string with the number in Bengali digits.
 */
export function toBengaliNumber(number: number | string): string {
  if (number === null || number === undefined) {
    return '';
  }
  const numStr = String(number);
  let bengaliStr = '';
  for (let i = 0; i < numStr.length; i++) {
    const digit = parseInt(numStr[i], 10);
    if (!isNaN(digit)) {
      bengaliStr += BENGALI_DIGITS[digit];
    } else {
      bengaliStr += numStr[i];
    }
  }
  return bengaliStr;
}

export function formatBengaliDate(date: Date): string {
  // This is a placeholder. You can implement a full-fledged Bengali date formatter here.
  return toBengaliNumber(date.toLocaleDateString('bn-BD'));
}