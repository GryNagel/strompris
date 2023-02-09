import type { Cities } from '~/types';

export type Area = {
  number: string;
  title: string;
  original: Cities;
};

export const areas: Record<Cities, Area> = {
  tromso: {
    number: '4',
    title: 'Nord',
    original: 'tromso',
  },
  bergen: {
    number: '5',
    title: 'Vest',
    original: 'bergen',
  },
  oslo: {
    number: '1',
    title: 'Øst',
    original: 'oslo',
  },
  kristiansand: {
    number: '2',
    title: 'Sør',
    original: 'kristiansand',
  },
  trondheim: {
    number: '3',
    title: 'Midt',
    original: 'trondheim',
  },
} as const;
