import './table.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { winnerService } from '../../../services/winner.service';

export class WinnersTable extends DOMElement {
  private titleRow: DOMElement;

  private countTitle: DOMElement;

  private colorTitle: DOMElement;

  private nameTitle: DOMElement;

  private winsTitle: DOMElement;

  private timeTitle: DOMElement;

  private winnersList: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['winners-table'],
    });

    this.titleRow = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['winners-table__title-row'],
    });

    this.countTitle = new DOMElement(this.titleRow.node, {
      tagName: 'div',
      classList: ['winners-table__number-title'],
      content: '№',
    });

    this.colorTitle = new DOMElement(this.titleRow.node, {
      tagName: 'div',
      classList: ['winners-table__color-title'],
      content: 'color',
    });

    this.nameTitle = new DOMElement(this.titleRow.node, {
      tagName: 'div',
      classList: ['winners-table__name-title'],
      content: 'name',
    });

    this.winsTitle = new DOMElement(this.titleRow.node, {
      tagName: 'div',
      classList: ['winners-table__wins-title'],
      content: 'wins',
    });

    this.timeTitle = new DOMElement(this.titleRow.node, {
      tagName: 'div',
      classList: ['winners-table__time-title'],
      content: 'best time',
    });

    this.winnersList = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['winners-table__list'],
    });

    winnerService.renderContainer = this.winnersList.node;
    winnerService.renderWinners();
  }
}
