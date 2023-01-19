import './counter.scss';

import { DOMElement } from '../../../../shared/components/base-elements/dom-element';

export class Counter extends DOMElement {
  public counter: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'h2',
      classList: ['car-count'],
      content: 'Garage - ',
    });

    this.counter = new DOMElement(this.node, {
      tagName: 'span',
      classList: ['car-count__counter'],
      content: `${1}`,
    });
  }
}
