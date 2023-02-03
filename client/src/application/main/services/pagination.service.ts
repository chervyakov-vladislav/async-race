import { CarInterface } from '../../shared/models/response-data';
import { state } from '../../shared/services/state';
import { carsListService } from './cars-list.service';

class PaginationService {
  public prevGarageButton: HTMLButtonElement | null = null;

  public nextGarageButton: HTMLButtonElement | null = null;

  public counter: HTMLElement | null = null;

  public nextGaragePage() {
    const currPage = state.getCarsPage() + 1;
    state.setCarsPage(currPage);
    (carsListService.raceButton as HTMLButtonElement).disabled = false;
    carsListService.renderCars();
  }

  public prevGaragePage() {
    const currPage = state.getCarsPage() - 1;
    state.setCarsPage(currPage);
    (carsListService.raceButton as HTMLButtonElement).disabled = false;
    carsListService.renderCars();
  }

  public checkGarageButtonStyles() {
    const prev = this.prevGarageButton as HTMLButtonElement;
    const next = this.nextGarageButton as HTMLButtonElement;
    const currPage = state.getCarsPage();
    const itemsPerPage = 7;
    const maxPage = Math.ceil(state.allData.carsCount / itemsPerPage);

    prev.disabled = currPage === 1 ? true : false;

    next.disabled = currPage === maxPage || state.allData.carsCount < 8 ? true : false;

    (this.counter as HTMLElement).innerText = `Page: ${currPage}`;
  }

  public removeToPrevPage() {
    const currPage = state.getCarsPage();
    const carsOnPage = (state.allData.cars as CarInterface[]).length;

    if (currPage !== 1 && carsOnPage === 0) {
      state.setCarsPage(currPage - 1);
      (carsListService.raceButton as HTMLButtonElement).disabled = false;
      carsListService.renderCars();
    }
  }
}

const paginationService = new PaginationService();
export { paginationService };
