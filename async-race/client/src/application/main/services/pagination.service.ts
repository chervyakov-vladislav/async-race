import { state } from '../../shared/services/state';
import { garageListService } from './cars-list.service';

class PaginationService {
  public prevGarageButton: HTMLButtonElement | null;

  public nextGarageButton: HTMLButtonElement | null;

  public counter: HTMLElement | null;

  constructor() {
    this.prevGarageButton = null;
    this.nextGarageButton = null;
    this.counter = null;
  }

  public nextGaragePage() {
    const currPage = state.getCarsPage() + 1;
    state.setCarsPage(currPage);
    garageListService.renderCars();
  }

  public prevGaragePage() {
    const currPage = state.getCarsPage() - 1;
    state.setCarsPage(currPage);
    garageListService.renderCars();
  }

  public checkGarageButtonStyles() {
    const prev = this.prevGarageButton as HTMLButtonElement;
    const next = this.nextGarageButton as HTMLButtonElement;
    const currPage = state.getCarsPage();
    const itemsPerPage = 7;
    const maxPage = Math.ceil(state.allData.carsCount / itemsPerPage);

    if (currPage === 1) {
      prev.disabled = true;
    } else {
      prev.disabled = false;
    }

    if (currPage === maxPage || state.allData.carsCount < 8) {
      next.disabled = true;
    } else {
      next.disabled = false;
    }

    // if (state.allData.carsCount < 8) {
    //   (paginationService.nextGarageButton as HTMLButtonElement).disabled = true;
    // } else (paginationService.nextGarageButton as HTMLButtonElement).disabled = false;

    (this.counter as HTMLElement).innerText = `Page: ${currPage}`;
  }
}

const paginationService = new PaginationService();
export { paginationService };
