import { Options } from '../components/garage/options/options';
import { garageListService } from './cars-list.service';
import brands from '../../shared/components/brands';
import { CarItem } from '../components/garage/cars-list/car-item/car-item';
import { CarInterface } from '../../shared/models/response-data';
import { apiService } from '../../shared/services/api.service';
import { state } from '../../shared/services/state';
import { animationService } from './animation.service';
import { winnerService } from './winner.service';
import { paginationService } from './pagination.service';

class GarageListenersService {
  public updateTextInput: HTMLInputElement | null;

  public updateColorInput: HTMLInputElement | null;

  public updateButton: HTMLButtonElement | null;

  public carItemArr: CarItem[];

  constructor() {
    this.updateTextInput = null;
    this.updateColorInput = null;
    this.updateButton = null;
    this.carItemArr = [];
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

      paginationService.checkGarageButtonStyles();
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

      paginationService.checkGarageButtonStyles();
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

      const currentWinners = await apiService.getAllWinners(state.allData.winnersPage);
      const isWinner = currentWinners.result.filter((currentWinner) => currentWinner.id === id);
      if (isWinner.length) winnerService.renderWinners();
    });

    options.raceButton.node.addEventListener('click', async () => {
      (options.raceButton.node as HTMLButtonElement).disabled = true;

      const carItemPromisesArr = this.carItemArr.map(async (item, index) => {
        (item.play.node as HTMLButtonElement).disabled = true;
        (item.pause.node as HTMLButtonElement).disabled = false;

        animationService.setDistance(this.carItemArr[index].icon.node);

        const carData = (state.allData.cars as CarInterface[])[index];
        return apiService.startEngine(carData.id as number);
      });

      await Promise.all(carItemPromisesArr).then((res) => {
        res.forEach(async (data, index) => {
          const carID = (state.allData.cars as CarInterface[])[index].id as number;
          const animationID = await animationService.animation(this.carItemArr[index].icon.node, data.res, carID);
          state.setTime(new Date().getTime());
          state.setAnimationID(carID, animationID);
        });
      });

      let finishFlag = 0;
      this.carItemArr.forEach(async (_item, index) => {
        const carData = (state.allData.cars as CarInterface[])[index];
        const finishSignal = await apiService.isBroken(carData.id as number);

        if (finishSignal.status === 500 || finishSignal.status === 404) {
          const carID = parseInt(finishSignal.url.split('id=')[1]);
          const animationID = state.getAnimationID(carID);

          await animationService.stop(animationID);
        }

        if (finishSignal.status === 200 && !finishFlag) {
          finishFlag = 1;
          const carID = parseInt(finishSignal.url.split('id=')[1]);
          winnerService.win(carID);
        }
      });
    });

    options.resetButton.node.addEventListener('click', async () => {
      if (state.allData.carsCount > 1) {
        (options.raceButton.node as HTMLButtonElement).disabled = false;
      }

      this.carItemArr.forEach(async (item, index) => {
        (item.play.node as HTMLButtonElement).disabled = false;
        (item.pause.node as HTMLButtonElement).disabled = true;

        const carData = (state.allData.cars as CarInterface[])[index];
        const carID = carData.id as number;
        await apiService.stopEngine(carID);
        await animationService.reset(carID, item.icon.node.firstChild as HTMLElement);
      });
    });
  }

  public appendCarItemLiseners(carItem: CarItem, carData: CarInterface) {
    carItem.remove.node.addEventListener('click', async () => {
      const id = carData.id as number;
      await apiService.deleteCar(id);
      await garageListService.renderCars();
      garageListService.updateCounter();
      const textInput = this.updateTextInput as HTMLInputElement;
      const updateButton = this.updateButton as HTMLButtonElement;
      textInput.value = '';
      updateButton.disabled = true;

      const currentWinners = await apiService.getAllWinners(state.allData.winnersPage);
      const isWinner = currentWinners.result.filter((currentWinner) => currentWinner.id === id);
      if (isWinner.length) {
        await apiService.deleteWinner(id);
        winnerService.renderWinners();
      }

      paginationService.removeToPrevPage();
      paginationService.checkGarageButtonStyles();
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
      animationService.animation(carItem.icon.node, data.res, carData.id as number);

      const finishSignal = await apiService.isBroken(carData.id as number);
      if (finishSignal.status === 500) {
        const animationID = state.getAnimationID(carData.id as number);
        animationService.stop(animationID);
      }
    });

    carItem.pause.node.addEventListener('click', async () => {
      (carItem.play.node as HTMLButtonElement).disabled = false;
      (carItem.pause.node as HTMLButtonElement).disabled = true;
      const carID = carData.id as number;
      await apiService.stopEngine(carID);
      animationService.reset(carID, carItem.icon.node.firstChild as HTMLElement);
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
