import { City } from './types';

export const emptyCity: City[] = [
  {
    cityName: '',
    uuid: '',
    count: 0,
  },
];

export const cityErrorResponse: City[] = [
  {
    cityName: 'Not Found',
    uuid: 'Not Found',
    count: 0,
  },
];
