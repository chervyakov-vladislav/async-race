import { modalService } from '../../core/services/modal.service';
import { CarInterface, WinnerInterface } from '../../shared/models/response-data';
import { apiService } from '../../shared/services/api.service';
import { state } from '../../shared/services/state';
import { WinnerItem } from '../components/winners-page/table/winner/winner';

class WinnerService {
  public renderContainer: HTMLElement | null;

  constructor() {
    this.renderContainer = null;
  }

  public async win(id: number) {
    const cars = state.allData.cars;
    const winner = (cars as CarInterface[]).filter((item) => item.id === id)[0];

    const startTime = state.getTime();
    const finishTime = (new Date().getTime() - startTime) / 1000;
    const modalText = `${winner.name} wins, ${finishTime} sec`;
    setTimeout(() => modalService.appendModal(modalText), 1500);

    const carData: WinnerInterface = {
      id: id,
      wins: 1,
      time: finishTime,
    };
    await this.checkWinner(carData);

    //рендерим новую таблицу
    this.renderWinners();
  }

  private async checkWinner(carData: WinnerInterface) {
    const checkData = await apiService.getWinner(carData.id);

    if (checkData.status === 200) {
      checkData.result.wins++;
      carData.wins = checkData.result.wins;
      carData.time = checkData.result.time < carData.time ? checkData.result.time : carData.time;

      await this.updateWinner(carData);
    } else {
      await this.createWinner(carData);
    }
  }

  private async createWinner(carData: WinnerInterface) {
    await apiService.createWinner(carData);
    console.log(carData, 'создан победитель');
  }

  private async updateWinner(carData: WinnerInterface) {
    await apiService.updateWinner(carData);
    console.log(carData, 'обновлен победитель');
  }

  public async renderWinners() {
    const container = this.renderContainer as HTMLElement;
    const page = state.allData.winnersPage;
    // забрать данные по сортировкам из стейта и закинуть в getAllWinners, пока тут только page
    const data = await apiService.getAllWinners(page);

    container.innerHTML = '';
    data.result.forEach(async (winnerData, index) => {
      const carData = (await apiService.getCar(winnerData.id)) as CarInterface;
      new WinnerItem(container, winnerData, carData, index);
    });
  }
}

const winnerService = new WinnerService();
export { winnerService };
