import './garage-page.scss';

import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { Page } from '../../../shared/components/page';

export class GaragePage extends Page {
  private options: DOMElement;

  private content: DOMElement;

  private pagination: DOMElement;

  constructor(id: string) {
    super(id);

    this.options = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['garage__options'],
      content: 'garage',
    });

    this.content = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['garage__content'],
    });

    this.pagination = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['garage__pagination'],
    });
  }
}
