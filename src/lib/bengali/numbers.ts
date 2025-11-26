/**
 * Bengali Number Conversion Utilities
 * Converts English numbers to Bengali numerals and vice versa
 */

export const ENGLISH_TO_BENGALI_DIGITS: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯'
};

export const BENGALI_TO_ENGLISH_DIGITS: Record<string, string> = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9'
};

/**
 * Convert English number string to Bengali numerals
 */
export function toBengaliNumber(input: string | number): string {
  const str = input.toString();
  return str.replace(/[0-9]/g, (digit) => ENGLISH_TO_BENGALI_DIGITS[digit] || digit);
}

/**
 * Convert Bengali numeral string to English numbers
 */
export function toEnglishNumber(input: string): string {
  return input.replace(/[০-৯]/g, (digit) => BENGALI_TO_ENGLISH_DIGITS[digit] || digit);
}

/**
 * Parse Bengali numeral string to number
 */
export function parseBengaliNumber(input: string): number {
  const englishStr = toEnglishNumber(input);
  return parseInt(englishStr, 10);
}

/**
 * Format number with Bengali numerals and optional thousands separator
 */
export function formatBengaliNumber(
  num: number,
  options: {
    useSeparator?: boolean;
    separator?: string;
    decimals?: number;
  } = {}
): string {
  const { useSeparator = true, separator = ',', decimals = 0 } = options;
  
  let formatted = num.toFixed(decimals);
  
  if (useSeparator) {
    const parts = formatted.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    formatted = parts.join('.');
  }
  
  return toBengaliNumber(formatted);
}

/**
 * Bengali number suffixes for ordinals
 */
export const BENGALI_ORDINAL_SUFFIXES = {
  1: 'ম',
  2: 'য়',
  3: 'য়',
  4: 'র্থ',
  5: 'ম',
  6: 'ষ্ঠ',
  7: 'ম',
  8: 'ম',
  9: 'ম',
  0: 'ম'
};

/**
 * Convert number to Bengali ordinal
 */
export function toBengaliOrdinal(num: number): string {
  const lastDigit = num % 10;
  const suffix = BENGALI_ORDINAL_SUFFIXES[lastDigit as keyof typeof BENGALI_ORDINAL_SUFFIXES];
  return `${toBengaliNumber(num)}${suffix}`;
}

/**
 * Bengali number words
 */
export const BENGALI_NUMBER_WORDS: Record<string, string> = {
  '0': 'শূন্য',
  '1': 'এক',
  '2': 'দুই',
  '3': 'তিন',
  '4': 'চার',
  '5': 'পাঁচ',
  '6': 'ছয়',
  '7': 'সাত',
  '8': 'আট',
  '9': 'নয়',
  '10': 'দশ',
  '20': 'বিশ',
  '30': 'ত্রিশ',
  '40': 'চল্লিশ',
  '50': 'পঞ্চাশ',
  '60': 'ষাট',
  '70': 'সত্তর',
  '80': 'আশি',
  '90': 'নব্বই',
  '100': 'একশো',
  '1000': 'এক হাজার',
  '100000': 'এক লাখ',
  '10000000': 'এক কোটি'
};

/**
 * Convert number to Bengali words (basic implementation)
 */
export function numberToBengaliWords(num: number): string {
  if (num === 0) return BENGALI_NUMBER_WORDS['0'];
  
  if (num <= 100) {
    return BENGALI_NUMBER_WORDS[num.toString()] || toBengaliNumber(num);
  }
  
  // For larger numbers, this is a simplified implementation
  // In a real application, you'd want a more comprehensive conversion
  return toBengaliNumber(num);
}