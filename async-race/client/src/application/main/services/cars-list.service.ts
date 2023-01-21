import { CarInterface } from '../../shared/models/response-data';
import { apiService } from '../../shared/services/api.service';
import { state } from '../../shared/services/state';
import { CarItem } from '../components/garage/cars-list/car-item/car-item';

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
    (state.allData.cars as CarInterface[]).forEach((carData) => new CarItem(container, carData));
  }

  public async updateCounter() {
    await state.updateGarageState();
    const counter = this.counter as HTMLElement;
    counter.innerText = String(state.allData.carsCount);
  }

  public async createCar(name: string, color: string) {
    const car: CarInterface = {
      color: color,
      name: name,
    };
    await apiService.createCar(car);
  }
}

const garageListService = new GarageListService();
export { garageListService };
