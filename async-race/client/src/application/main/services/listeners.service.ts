import { Options } from '../components/garage/options/options';
import { garageListService } from './cars-list.service';
import brands from '../../shared/components/brands';
import { CarItem } from '../components/garage/cars-list/car-item/car-item';
import { CarInterface } from '../../shared/models/response-data';
import { apiService } from '../../shared/services/api.service';
import { state } from '../../shared/services/state';
import { animationService } from './animation.service';

class GarageListenersService {
  public updateTextInput: HTMLInputElement | null;

  public updateColorInput: HTMLInputElement | null;

  public updateButton: HTMLButtonElement | null;

  constructor() {
    this.updateTextInput = null;
    this.updateColorInput = null;
    this.updateButton = null;
  }

  public appendOptionsListeners(options: Options) {
    options.createButton.node.addEventListener('click', async () => {
      const color = (options.colorCreateInput.node as HTMLInputElement).value;
      const name =
        (options.createInput.node as HTMLInputElement).value.length > 0
          ? (options.createInput.node as HTMLInputElement).value
          : this.generateRandomName();
      const car: CarInterface = {
        color: color,
        name: name,
      };
      await apiService.createCar(car);
      await garageListService.renderCars();
      garageListService.updateCounter();
      (options.createInput.node as HTMLInputElement).value = '';
    });

    options.generateButton.node.addEventListener('click', async () => {
      for (let i = 0; i < 100; i++) {
        const car: CarInterface = {
          color: this.generateRandomColor(),
          name: this.generateRandomName(),
        };
        await apiService.createCar(car);
      }
      garageListService.renderCars();
      garageListService.updateCounter();
    });

    options.updateButton.node.addEventListener('click', async () => {
      const id = state.allData.updateID;
      const name = (this.updateTextInput as HTMLInputElement).value.length
        ? (this.updateTextInput as HTMLInputElement).value
        : this.generateRandomName();
      const color = (this.updateColorInput as HTMLInputElement).value;
      const car: CarInterface = {
        color: color,
        name: name,
        id: id,
      };
      await apiService.updateCar(car);
      await garageListService.renderCars();
      (options.updateButton.node as HTMLButtonElement).disabled = true;
      (this.updateTextInput as HTMLInputElement).value = '';
    });
  }

  public appendCarItemLiseners(carItem: CarItem, carData: CarInterface) {
    carItem.remove.node.addEventListener('click', async () => {
      const id = carData.id as number;
      await apiService.deleteCar(id);
      await garageListService.renderCars();
      garageListService.updateCounter();
      const textInput = this.updateTextInput as HTMLInputElement;
      const button = this.updateButton as HTMLButtonElement;
      textInput.value = '';
      button.disabled = true;
    });

    carItem.select.node.addEventListener('click', () => {
      const textInput = this.updateTextInput as HTMLInputElement;
      const colorInput = this.updateColorInput as HTMLInputElement;
      const button = this.updateButton as HTMLButtonElement;
      textInput.value = carData.name;
      colorInput.value = carData.color;
      button.disabled = false;
      state.allData.updateID = carData.id as number;
    });

    carItem.play.node.addEventListener('click', async () => {
      (carItem.play.node as HTMLButtonElement).disabled = true;
      (carItem.pause.node as HTMLButtonElement).disabled = false;

      const data = await apiService.startEngine(carData.id as number);
      animationService.animation(carItem.icon.node, data.res);

      const finishSignal = await apiService.isBroken(carData.id as number);
      if (!finishSignal) animationService.stop();
    });

    carItem.pause.node.addEventListener('click', async () => {
      (carItem.play.node as HTMLButtonElement).disabled = false;
      (carItem.pause.node as HTMLButtonElement).disabled = true;

      await apiService.stopEngine(carData.id as number);
      animationService.reset(carItem.icon.node.firstChild as HTMLElement);
    });
  }

  private generateRandomName() {
    const randomIndex = Math.floor(Math.random() * (brands.length - 1));
    return brands[randomIndex];
  }

  private generateRandomColor() {
    const hexCodes = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += hexCodes[Math.floor(Math.random() * (hexCodes.length - 1))];
    }
    return '#' + color;
  }
}

const listeners = new GarageListenersService();
export { listeners };
