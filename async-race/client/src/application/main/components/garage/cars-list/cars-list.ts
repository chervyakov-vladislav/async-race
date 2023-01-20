import { DOMElement } from '../../../../shared/components/base-elements/dom-element';

export class CarsList extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['car-list'],
    });
  }
}
