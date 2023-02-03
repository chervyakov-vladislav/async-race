import './winners-page.scss';

import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { Page } from '../../../shared/components/page';
import { WinnersTitles } from '../../components/winners-page/titles/titles';
import { WinnersTable } from '../../components/winners-page/table/table';
import { WinnersPagination } from '../../components/winners-page/pagination/pagintion';

export class WinnersPage extends Page {
  private titlesContainer: DOMElement;

  private tableContainer: DOMElement;

  private paginationContainer: DOMElement;

  private title: WinnersTitles;

  private table: WinnersTable;

  private pagination: WinnersPagination;

  constructor(id: string) {
    super(id);

    this.titlesContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['winners-page__titles'],
    });

    this.tableContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['winners-page__table'],
    });

    this.paginationContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['winners-page__pagination-buttons'],
    });

    this.title = new WinnersTitles(this.titlesContainer.node);
    this.table = new WinnersTable(this.tableContainer.node);
    this.pagination = new WinnersPagination(this.paginationContainer.node);
  }
}
