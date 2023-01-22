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
      sortBy: null,
      sortOrder: null,
      updateID: 0,
      animation: {},
    };
  }

  public async updateGarageState() {
    const res = await apiService.getCars();
    this.allData.cars = res?.cars;
    this.allData.carsCount = Number(res?.count);
  }

  public getAnimationID(id: number) {
    return this.allData.animation[id];
  }

  public setAnimationID(id: number, animationID: number) {
    this.allData.animation[id] = animationID;
  }
}

const state = new State();
export { state };
