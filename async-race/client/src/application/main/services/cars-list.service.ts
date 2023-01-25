import { CarInterface } from '../../shared/models/response-data';
import { state } from '../../shared/services/state';
import { CarItem } from '../components/garage/cars-list/car-item/car-item';
import { listeners } from './listeners.service';
import { paginationService } from './pagination.service';

class CarsListService {
  public container: HTMLElement | null = null;

  private carItem: HTMLElement | null = null;

  public createCarButton: HTMLButtonElement | null = null;

  public counter: HTMLElement | null = null;

  public raceButton: HTMLElement | null = null;

  public async renderCars() {
    const currPage = state.getCarsPage();
    await state.updateGarageState(currPage);
    paginationService.checkGarageButtonStyles();

    const container = this.container as HTMLElement;
    const carsState = state.allData.cars as CarInterface[];

    container.innerHTML = '';
    listeners.carItemArr = carsState.map((carData) => new CarItem(container, carData));
  }

  public async updateCounter() {
    const currPage = state.getCarsPage();
    await state.updateGarageState(currPage);
    const counter = this.counter as HTMLElement;
    const raceButton = this.raceButton as HTMLButtonElement;

    counter.innerText = String(state.allData.carsCount);
    raceButton.disabled = state.allData.carsCount < 2 ? true : false;
  }
}

const carsListService = new CarsListService();
export { carsListService };
