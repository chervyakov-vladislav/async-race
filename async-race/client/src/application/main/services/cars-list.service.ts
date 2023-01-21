import { CarInterface } from '../../shared/models/response-data';
import { state } from '../../shared/services/state';
import { CarItem } from '../components/garage/cars-list/car-item/car-item';
import { listeners } from './listeners.service';

class GarageListService {
  public container: HTMLElement | null;

  private carItem: HTMLElement | null;

  public createCarButton: HTMLButtonElement | null;

  public counter: HTMLElement | null;

  constructor() {
    this.container = null;
    this.carItem = null;

    this.counter = null;

    this.createCarButton = null;
  }

  public async renderCars() {
    await state.updateGarageState();
    const container = this.container as HTMLElement;
    container.innerHTML = '';
    listeners.carItemArr = (state.allData.cars as CarInterface[]).map((carData) => new CarItem(container, carData));
  }

  public async updateCounter() {
    await state.updateGarageState();
    const counter = this.counter as HTMLElement;
    counter.innerText = String(state.allData.carsCount);
  }
}

const garageListService = new GarageListService();
export { garageListService };
