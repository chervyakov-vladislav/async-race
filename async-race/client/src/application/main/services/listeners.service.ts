import { Options } from '../components/garage/options/options';
import { garageListService } from './cars-list.service';

class GarageListenersService {
  public createCar(options: Options) {
    options.createButton.node.addEventListener('click', () => {
      const color = (options.colorCreateInput.node as HTMLInputElement).value;
      const name = (options.createInput.node as HTMLInputElement).value;
      garageListService.createCar(name, color);
      garageListService.renderCars();
      garageListService.updateCounter();
    });
  }
}

const listeners = new GarageListenersService();
export { listeners };
