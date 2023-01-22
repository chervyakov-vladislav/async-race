import { modalService } from '../../core/services/modal.service';
import { CarInterface } from '../../shared/models/response-data';
import { state } from '../../shared/services/state';

class WinnerService {
  public win(id: number) {
    const cars = state.allData.cars;
    const winner = (cars as CarInterface[]).filter((item) => item.id === id)[0];

    const startTime = state.getTime();
    const finishTime = (new Date().getTime() - startTime) / 1000;
    const modalText = `${winner.name} wins, ${finishTime} sec`;
    setTimeout(() => modalService.appendModal(modalText), 1500);
  }
}

const winnerService = new WinnerService();
export { winnerService };
