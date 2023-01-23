import { CarInterface } from '../../shared/models/response-data';
import { state } from '../../shared/services/state';
import { CarItem } from '../components/garage/cars-list/car-item/car-item';
import { listeners } from './listeners.service';
import { paginationService } from './pagination.service';

class GarageListService {
  public container: HTMLElement | null;

  private carItem: HTMLElement | null;

  public createCarButton: HTMLButtonElement | null;

  public counter: HTMLElement | null;

  public raceButton: HTMLElement | null;

  constructor() {
    this.container = null;
    this.carItem = null;

    this.counter = null;
    this.raceButton = null;
    this.createCarButton = null;
  }

  public async renderCars() {
    const currPage = state.getCarsPage();
    await state.updateGarageState(currPage);
    paginationService.checkGarageButtonStyles();

    const container = this.container as HTMLElement;
    container.innerHTML = '';
    listeners.carItemArr = (state.allData.cars as CarInterface[]).map((carData) => new CarItem(container, carData));
  }

  public async updateCounter() {
    const currPage = state.getCarsPage();
    await state.updateGarageState(currPage);
    const counter = this.counter as HTMLElement;
    counter.innerText = String(state.allData.carsCount);
    if (state.allData.carsCount < 2) {
      (this.raceButton as HTMLButtonElement).disabled = true;
    } else {
      (this.raceButton as HTMLButtonElement).disabled = false;
    }
  }
}

const garageListService = new GarageListService();
export { garageListService };
