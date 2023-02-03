import { modalService } from '../../core/services/modal.service';
import { CarInterface, WinnerInterface } from '../../shared/models/response-data';
import { apiService } from '../../shared/services/api.service';
import { state } from '../../shared/services/state';
import { WinnerItem } from '../components/winners-page/table/winner/winner';
import { winnersPaginationService } from './winner-pagination.service';

class WinnerService {
  public renderContainer: HTMLElement | null = null;

  public winnerCounter: HTMLElement | null = null;

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

    this.renderWinners();
  }

  private async checkWinner(carData: WinnerInterface) {
    const currentWinners = await apiService.getAllWinners(state.allData.winnersPage);
    const isOldWinner = currentWinners.result.filter((currentWinner) => currentWinner.id === carData.id);

    if (isOldWinner.length) {
      const checkData = await apiService.getWinner(carData.id);
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
  }

  private async updateWinner(carData: WinnerInterface) {
    await apiService.updateWinner(carData);
  }

  public async renderWinners() {
    const container = this.renderContainer as HTMLElement;
    const page = state.getWinnersPage();
    const order = state.getSortOrder();
    const sortType = state.getSortType();

    const data = await apiService.getAllWinners(page, sortType, order);
    state.allData.winnersCount = Number(data.totalCount);

    container.innerHTML = '';
    data.result.forEach(async (winnerData, index) => {
      const carData = (await apiService.getCar(winnerData.id)) as CarInterface;
      new WinnerItem(container, winnerData, carData, index);
    });

    const counter = this.winnerCounter as HTMLElement;
    counter.innerText = `Winners - ${data.totalCount}`;
    winnersPaginationService.checkGarageButtonStyles();
  }

  public async sortWin() {
    const currentSort = state.getSortType();
    const currentOrder = state.getSortOrder();

    if (currentSort !== 'wins') {
      state.setSortType('wins');
      state.setSortOrder('DESC');
    } else {
      if (currentOrder === 'ASC') {
        state.setSortOrder('DESC');
      } else state.setSortOrder('ASC');
    }
  }

  public async sortTime() {
    const currentSort = state.getSortType();
    const currentOrder = state.getSortOrder();

    if (currentSort !== 'time') {
      state.setSortType('time');
      state.setSortOrder('ASC');
    } else {
      if (currentOrder === 'ASC') {
        state.setSortOrder('DESC');
      } else state.setSortOrder('ASC');
    }
  }
}

const winnerService = new WinnerService();
export { winnerService };
