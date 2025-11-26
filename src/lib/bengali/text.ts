/**
 * Bengali Text Processing Utilities
 * Handles text normalization, transliteration, and common Bengali text operations
 */

/**
 * Bengali vowels (sworoborno)
 */
export const BENGALI_VOWELS = [
  'অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'
];

/**
 * Bengali consonants (byonjonborno)
 */
export const BENGALI_CONSONANTS = [
  'ক', 'খ', 'গ', 'ঘ', 'ঙ',
  'চ', 'ছ', 'জ', 'ঝ', 'ঞ',
  'ট', 'ঠ', 'ড', 'ঢ', 'ণ',
  'ত', 'থ', 'দ', 'ধ', 'ন',
  'প', 'ফ', 'ব', 'ভ', 'ম',
  'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ',
  'ড়', 'ঢ়', 'য়', 'ৎ', 'ং', 'ঃ', 'ঁ'
];

/**
 * Bengali digits
 */
export const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/**
 * Check if a character is Bengali
 */
export function isBengaliCharacter(char: string): boolean {
  const charCode = char.charCodeAt(0);
  return (charCode >= 0x0980 && charCode <= 0x09FF);
}

/**
 * Check if a string contains Bengali text
 */
export function containsBengali(text: string): boolean {
  return /[ঀ-৿]/.test(text);
}

/**
 * Check if text is primarily Bengali
 */
export function isPrimarilyBengali(text: string, threshold: number = 0.5): boolean {
  const bengaliChars = text.split('').filter(isBengaliCharacter).length;
  const totalChars = text.replace(/\s/g, '').length;
  return totalChars > 0 && (bengaliChars / totalChars) >= threshold;
}

/**
 * Normalize Bengali text (handle different forms of characters)
 */
export function normalizeBengaliText(text: string): string {
  // Normalize different forms of 'ya'
  text = text.replace(/য়/g, 'য়');
  
  // Normalize different forms of 'ra'
  text = text.replace(/র/g, 'র');
  
  // Handle vowel signs (kar)
  text = text.replace(/[া-ৌ]/g, (match) => match);
  
  return text;
}

/**
 * Get Bengali character count (properly handles compound characters)
 */
export function getBengaliCharacterCount(text: string): number {
  // This is a simplified implementation
  // In production, you'd want to handle Unicode grapheme clusters properly
  return [...text].length;
}

/**
 * Truncate Bengali text to specified character count
 */
export function truncateBengaliText(
  text: string, 
  maxLength: number, 
  suffix: string = '...'
): string {
  if (getBengaliCharacterCount(text) <= maxLength) return text;
  
  const chars = [...text];
  return chars.slice(0, maxLength - suffix.length).join('') + suffix;
}

/**
 * Bengali punctuation marks
 */
export const BENGALI_PUNCTUATION = {
  comma: '،',
  fullStop: '।',
  questionMark: '?',
  exclamationMark: '!',
  colon: ':',
  semicolon: ';',
  quotationMark: '"',
  apostrophe: "'"
};

/**
 * Convert English punctuation to Bengali where applicable
 */
export function normalizeBengaliPunctuation(text: string): string {
  return text
    .replace(/\./g, BENGALI_PUNCTUATION.fullStop)
    .replace(/,/g, BENGALI_PUNCTUATION.comma);
}

/**
 * Common Bengali honorifics and titles
 */
export const BENGALI_HONORIFICS = [
  'জনাব', 'জনাবা', 'শ্রী', 'শ্রীমতী', 'স্যার', 
  'ডক্টর', 'প্রফেসর', 'ইঞ্জিনিয়ার', 'আপা', 'ভাই'
];

/**
 * Check if a word is a Bengali honorific
 */
export function isBengaliHonorific(word: string): boolean {
  return BENGALI_HONORIFICS.includes(word);
}

/**
 * Common Bengali prefixes and suffixes
 */
export const BENGALI_PREFIXES = ['শ্রী', 'মহাশয়', 'মহোদয়'];
export const BENGALI_SUFFIXES = ['জী', 'দা', 'বাবু', 'মিস্টার'];

/**
 * Extract Bengali words from mixed text
 */
export function extractBengaliWords(text: string): string[] {
  const bengaliWords = text.match(/[ঀ-৿]+/g);
  return bengaliWords || [];
}

/**
 * Count Bengali words in text
 */
export function countBengaliWords(text: string): number {
  return extractBengaliWords(text).length;
}

/**
 * Basic Bengali text statistics
 */
export function getBengaliTextStats(text: string): {
  characterCount: number;
  wordCount: number;
  bengaliCharacterCount: number;
  bengaliWordCount: number;
  containsBengali: boolean;
  bengaliPercentage: number;
} {
  const totalChars = text.replace(/\s/g, '').length;
  const bengaliChars = text.split('').filter(isBengaliCharacter).length;
  const totalWords = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const bengaliWords = countBengaliWords(text);
  
  return {
    characterCount: totalChars,
    wordCount: totalWords,
    bengaliCharacterCount: bengaliChars,
    bengaliWordCount: bengaliWords,
    containsBengali: containsBengali(text),
    bengaliPercentage: totalChars > 0 ? (bengaliChars / totalChars) * 100 : 0
  };
}