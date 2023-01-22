import { CarInterface } from '../../shared/models/response-data';
import { state } from '../../shared/services/state';

class WinnerService {
  public win(id: number) {
    const cars = state.allData.cars;
    const winner = (cars as CarInterface[]).filter((item) => item.id === id)[0];

    const startTime = state.getTime();
    const finishTime = (new Date().getTime() - startTime) / 1000;
    console.log('победила ', winner.name);
    console.log('время ', finishTime);
  }
}

const winnerService = new WinnerService();
export { winnerService };
