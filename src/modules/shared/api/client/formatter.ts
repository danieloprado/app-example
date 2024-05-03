import { isValid as dateFnsIsValid } from 'date-fns/isValid';
import { parse as dateFnsParse } from 'date-fns/parse';

export function formatApiResponse<T>(obj: T): T {
  if (!obj) return obj;

  if (Array.isArray(obj)) {
    return obj.map(i => formatApiResponse(i)) as any;
  }

  if (typeof obj === 'string' && isValidDateString(obj)) {
    return dateParse(obj) as any;
  }

  if (typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = formatApiResponse((obj as any)[key]);
      return acc;
    }, {} as any);
  }

  return obj;
}

function isValidDateString(value: any): boolean {
  return /^(\d{4})-(\d{2})-(\d{2})([T\s](\d{2}):(\d{2}):(\d{2})(\.(\d+)(Z)?)?)?$/.test(value);
}

function dateParse(value: any, format: string | null = null): Date {
  if (!value) return value;
  if (value instanceof Date) return value;

  const date = !format ? new Date(value) : dateFnsParse(value, format, new Date());
  if (!dateFnsIsValid(date)) return value;

  return date;
}
