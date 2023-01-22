import { CarInterface } from './response-data';

export interface StateInterface {
  carsPage: number;
  cars: CarInterface[] | null | undefined;
  carsCount: number;
  winnersPage: number;
  winnersCount: number;
  sortBy: null;
  sortOrder: null;
  updateID: number;
  animation: Record<number, number>;
  time: number;
}

export interface ResultsInterface {
  time: number;
  broken: boolean;
}
