import { StateInterface } from '../models/state';
import { apiService } from './api.service';

class State {
  public allData: StateInterface;

  constructor() {
    this.allData = {
      carsPage: 1,
      cars: null,
      carsCount: 0,
      winnersPage: 1,
      winnersCount: 0,
      animation: null,
      view: 'garage',
      sortBy: null,
      sortOrder: null,
    };
  }

  public async updateState() {
    const res = await apiService.getCars();
    this.allData.cars = res?.cars;
    this.allData.carsCount = Number(res?.count);
    console.log(this.allData);
  }
}

const state = new State();
export { state };