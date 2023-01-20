import { CarInterface } from './response-data';

export interface StateInterface {
  carsPage: number;
  cars: CarInterface[] | null | undefined;
  carsCount: number;
  winnersPage: number;
  winnersCount: number;
  animation: null;
  view: 'garage' | 'winners';
  sortBy: null;
  sortOrder: null;
}
