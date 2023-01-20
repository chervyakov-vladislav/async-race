import './cars-list.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { garageListService } from '../../../services/cars-list.service';

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
      content: `Page: ${1}`,
    });

    this.list = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['car-list__list'],
    });

    garageListService.renderCars(this.list.node);
  }
}
