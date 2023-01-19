import './garage-page.scss';

import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { Page } from '../../../shared/components/page';
import { Options } from '../../components/garage/options/options';

export class GaragePage extends Page {
  private optionsContainer: DOMElement;

  private options: Options;

  private contentContainer: DOMElement;

  private paginationContainer: DOMElement;

  constructor(id: string) {
    super(id);

    this.optionsContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['garage__options'],
    });

    this.contentContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['garage__content'],
    });

    this.paginationContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['garage__pagination'],
    });

    this.options = new Options(this.optionsContainer.node);
  }
}
