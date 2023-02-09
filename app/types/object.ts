import type { Entries } from '~/types';

export const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export const getEntries = <T extends object>(obj: T) => Object.entries(obj) as Entries<T>;
