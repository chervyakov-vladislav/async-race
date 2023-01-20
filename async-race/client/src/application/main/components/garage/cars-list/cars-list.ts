import './cars-list.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { garageListService } from '../../../services/cars-list.service';

export class CarsList extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['car-list'],
    });

    garageListService.renderCars(this.node);
  }
}
