import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { CarInterface } from '../../../../../shared/models/response-data';

export class CarItem extends DOMElement {
  constructor(parentNode: HTMLElement, carData: CarInterface) {
    super(parentNode, {
      tagName: 'li',
      classList: ['car-item'],
      content: carData.name,
    });
  }
}
