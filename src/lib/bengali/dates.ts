/**
 * Bengali Date and Time Utilities
 * Handles date formatting, calendar conversion, and Bengali months
 */

import { toBengaliNumber } from './numbers';

export const BENGALI_MONTHS = [
  'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন',
  'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
];

export const BENGALI_WEEKDAYS = [
  'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 
  'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'
];

export const BENGALI_WEEKDAYS_SHORT = [
  'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'
];

/**
 * Convert Gregorian date to Bengali date (simplified calculation)
 */
export function toBengaliDate(date: Date): {
  day: number;
  month: string;
  year: number;
  weekday: string;
} {
  // This is a simplified conversion
  // In production, you'd want to use a proper library like 'bengali-calendar'
  const bengaliYear = date.getFullYear() - 593; // Approximate
  const bengaliMonthIndex = (date.getMonth() + 2) % 12;
  const bengaliDay = date.getDate();
  
  return {
    day: bengaliDay,
    month: BENGALI_MONTHS[bengaliMonthIndex],
    year: bengaliYear,
    weekday: BENGALI_WEEKDAYS[date.getDay()]
  };
}

/**
 * Format date in Bengali style
 */
export function formatBengaliDate(
  date: Date,
  format: 'short' | 'long' | 'full' = 'long'
): string {
  const bengaliDate = toBengaliDate(date);
  
  switch (format) {
    case 'short':
      return `${toBengaliNumber(bengaliDate.day)} ${bengaliDate.month}`;
    case 'long':
      return `${toBengaliNumber(bengaliDate.day)} ${bengaliDate.month}, ${toBengaliNumber(bengaliDate.year)}`;
    case 'full':
      return `${bengaliDate.weekday}, ${toBengaliNumber(bengaliDate.day)} ${bengaliDate.month}, ${toBengaliNumber(bengaliDate.year)}`;
    default:
      return `${toBengaliNumber(bengaliDate.day)} ${bengaliDate.month}, ${toBengaliNumber(bengaliDate.year)}`;
  }
}

/**
 * Bengali time periods
 */
export const BENGALI_TIME_PERIODS = {
  morning: 'সকাল',
  noon: 'দুপুর',
  afternoon: 'বিকেল',
  evening: 'সন্ধ্যা',
  night: 'রাত',
  midnight: 'মধ্যরাত',
  dawn: 'ভোর'
};

/**
 * Get Bengali time period based on hour
 */
export function getBengaliTimePeriod(hour: number): string {
  if (hour >= 5 && hour < 12) return BENGALI_TIME_PERIODS.morning;
  if (hour >= 12 && hour < 15) return BENGALI_TIME_PERIODS.noon;
  if (hour >= 15 && hour < 18) return BENGALI_TIME_PERIODS.afternoon;
  if (hour >= 18 && hour < 21) return BENGALI_TIME_PERIODS.evening;
  if (hour >= 21 && hour < 24) return BENGALI_TIME_PERIODS.night;
  return BENGALI_TIME_PERIODS.midnight;
}

/**
 * Format time in Bengali style
 */
export function formatBengaliTime(date: Date, options: {
  showPeriod?: boolean;
  format24?: boolean;
} = {}): string {
  const { showPeriod = true, format24 = false } = options;
  
  let hours = date.getHours();
  const minutes = date.getMinutes();
  
  let period = '';
  if (showPeriod && !format24) {
    period = getBengaliTimePeriod(hours);
    hours = hours % 12 || 12;
  }
  
  const timeStr = `${toBengaliNumber(hours.toString().padStart(2, '0'))}:${toBengaliNumber(minutes.toString().padStart(2, '0'))}`;
  
  return period ? `${timeStr}, ${period}` : timeStr;
}

/**
 * Format full date and time in Bengali
 */
export function formatBengaliDateTime(
  date: Date,
  options: {
    dateFormat?: 'short' | 'long' | 'full';
    showTime?: boolean;
    showPeriod?: boolean;
  } = {}
): string {
  const { 
    dateFormat = 'long', 
    showTime = true, 
    showPeriod = true 
  } = options;
  
  const dateStr = formatBengaliDate(date, dateFormat);
  
  if (!showTime) return dateStr;
  
  const timeStr = formatBengaliTime(date, { showPeriod });
  
  return `${dateStr}, ${timeStr}`;
}