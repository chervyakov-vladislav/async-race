import { CarInterface } from '../../shared/models/response-data';
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
    (garageListService.raceButton as HTMLButtonElement).disabled = false;
    garageListService.renderCars();
  }

  public prevGaragePage() {
    const currPage = state.getCarsPage() - 1;
    state.setCarsPage(currPage);
    (garageListService.raceButton as HTMLButtonElement).disabled = false;
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

    (this.counter as HTMLElement).innerText = `Page: ${currPage}`;
  }

  public removeToPrevPage() {
    const currPage = state.getCarsPage();
    const carsOnPage = (state.allData.cars as CarInterface[]).length;

    if (currPage !== 1 && carsOnPage === 0) {
      state.setCarsPage(currPage - 1);
      (garageListService.raceButton as HTMLButtonElement).disabled = false;
      garageListService.renderCars();
    }
  }
}

const paginationService = new PaginationService();
export { paginationService };
