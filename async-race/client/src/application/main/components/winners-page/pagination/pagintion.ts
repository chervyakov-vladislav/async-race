import './pagination.scss';
import { ButtonElement } from '../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { winnersPaginationService } from '../../../services/winner-pagination.service';

export class WinnersPagination extends DOMElement {
  public prevButton: ButtonElement;

  public nextButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['winners-pagination'],
    });

    this.prevButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['button', 'winners-pagination__button'],
      content: 'prev',
    });

    this.nextButton = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['button', 'winners-pagination__button'],
      content: 'next',
    });

    this.nextButton.node.addEventListener('click', () => {
      winnersPaginationService.nextGaragePage();
      winnersPaginationService.checkGarageButtonStyles();
    });

    this.prevButton.node.addEventListener('click', () => {
      winnersPaginationService.prevGaragePage();
      winnersPaginationService.checkGarageButtonStyles();
    });
    winnersPaginationService.nextWinnersButton = this.nextButton.node as HTMLButtonElement;
    winnersPaginationService.prevWinnersButton = this.prevButton.node as HTMLButtonElement;
    winnersPaginationService.checkGarageButtonStyles();
  }
}
