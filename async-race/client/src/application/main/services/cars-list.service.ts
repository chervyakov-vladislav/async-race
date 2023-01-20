import { CarInterface } from '../../shared/models/response-data';
import { state } from '../../shared/services/state';
import { CarItem } from '../components/garage/cars-list/car-item/car-item';

class GarageListService {
  private container: HTMLElement | null;

  private carItem: HTMLElement | null;

  constructor() {
    this.container = null;
    this.carItem = null;
  }

  public async renderCars(container: HTMLElement) {
    await state.updateGarageState();
    container.innerHTML = '';
    (state.allData.cars as CarInterface[]).forEach((carData) => new CarItem(container, carData));
  }

  public async updateCounter(counter: HTMLElement) {
    await state.updateGarageState();
    counter.innerText = String(state.allData.cars?.length);
  }
}

const garageListService = new GarageListService();
export { garageListService };
