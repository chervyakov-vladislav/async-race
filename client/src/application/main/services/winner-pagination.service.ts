import { state } from '../../shared/services/state';
import { winnerService } from './winner.service';

class WinnersPaginationService {
  public prevWinnersButton: HTMLButtonElement | null = null;

  public nextWinnersButton: HTMLButtonElement | null = null;

  public counter: HTMLElement | null = null;

  public nextGaragePage() {
    const currPage = state.getWinnersPage() + 1;
    state.setWinnersPage(currPage);
    winnerService.renderWinners();
  }

  public prevGaragePage() {
    const currPage = state.getWinnersPage() - 1;
    state.setWinnersPage(currPage);
    winnerService.renderWinners();
  }

  public checkGarageButtonStyles() {
    const prev = this.prevWinnersButton as HTMLButtonElement;
    const next = this.nextWinnersButton as HTMLButtonElement;
    const currPage = state.getWinnersPage();
    const itemsPerPage = 10;
    const maxPage = Math.ceil(state.allData.winnersCount / itemsPerPage);

    if (currPage === 1) {
      prev.disabled = true;
    } else {
      prev.disabled = false;
    }

    if (currPage === maxPage || state.allData.winnersCount < 11) {
      next.disabled = true;
    } else {
      next.disabled = false;
    }

    (this.counter as HTMLElement).innerText = `Page: ${currPage}`;
  }
}

const winnersPaginationService = new WinnersPaginationService();
export { winnersPaginationService };
