import { format, formatISO, set } from "date-fns";

import {
  apiDateFormat,
  viewDateFormat,
  viewDateTimeFormat,
  viewTimeFormat,
} from "../_constants";

export function createApiDate(date: string | Date): string {
  return format(new Date(date), apiDateFormat);
}

export function createViewDate(date: string | Date): string {
  return format(new Date(date), viewDateFormat);
}

export function createViewDateAndTime(date: string | Date | undefined): string {
  if (!date) {
    return "";
  }
  return format(new Date(date), viewDateTimeFormat);
}

export function createViewTime(date: string | Date): string {
  return format(new Date(date), viewTimeFormat);
}

export function createIsoDate(date: string | Date): string {
  return formatISO(set(new Date(date), { minutes: 0, seconds: 0 }));
}
