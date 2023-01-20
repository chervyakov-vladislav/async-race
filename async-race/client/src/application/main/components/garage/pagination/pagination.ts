import './pagination.scss';

import { ButtonElement } from '../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';

export class Pagination extends DOMElement {
  public prevButton: ButtonElement;

  public nextButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['pagination'],
    });

    this.prevButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['button', 'pagination__button'],
      content: 'prev',
    });

    this.nextButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['button', 'pagination__button'],
      content: 'next',
    });
  }
}
