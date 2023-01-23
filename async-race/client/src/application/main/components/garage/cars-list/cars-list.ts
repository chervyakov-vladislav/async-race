import './cars-list.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { garageListService } from '../../../services/cars-list.service';
import { state } from '../../../../shared/services/state';
import { paginationService } from '../../../services/pagination.service';

export class CarsList extends DOMElement {
  public listTitle: DOMElement;

  private list: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['car-list'],
    });

    this.listTitle = new DOMElement(this.node, {
      tagName: 'p',
      classList: ['car-list__title'],
      content: `Page: ${state.getCarsPage()}`,
    });

    this.list = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['car-list__list'],
    });

    garageListService.container = this.list.node;
    garageListService.renderCars();
    paginationService.counter = this.listTitle.node;
  }
}
