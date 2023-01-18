import './winners-page.scss';

import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { Page } from '../../../shared/components/page';

export class WinnersPage extends Page {
  private table: DOMElement;

  constructor(id: string) {
    super(id);

    this.table = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['winners__table'],
      content: 'winners',
    });
  }
}
