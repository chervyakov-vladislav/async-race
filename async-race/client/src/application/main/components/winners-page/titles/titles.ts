import './titles.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { winnerService } from '../../../services/winner.service';

export class WinnersTitles extends DOMElement {
  private pageCount: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'h2',
      classList: ['winners-page__count'],
      content: 'Winners - 0',
    });

    this.pageCount = new DOMElement(parentNode, {
      tagName: 'span',
      classList: ['winners-page__page-count'],
      content: 'Page - 1',
    });

    winnerService.winnerCounter = this.node;
  }
}
