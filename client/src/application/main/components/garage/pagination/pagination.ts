import './pagination.scss';

import { ButtonElement } from '../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { paginationService } from '../../../services/pagination.service';

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
      disabled: true,
    });

    this.nextButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['button', 'pagination__button'],
      content: 'next',
    });

    this.nextButton.node.addEventListener('click', () => {
      paginationService.nextGaragePage();
      paginationService.checkGarageButtonStyles();
    });

    this.prevButton.node.addEventListener('click', () => {
      paginationService.prevGaragePage();
      paginationService.checkGarageButtonStyles();
    });
    paginationService.nextGarageButton = this.nextButton.node as HTMLButtonElement;
    paginationService.prevGarageButton = this.prevButton.node as HTMLButtonElement;
    paginationService.checkGarageButtonStyles();
  }
}
