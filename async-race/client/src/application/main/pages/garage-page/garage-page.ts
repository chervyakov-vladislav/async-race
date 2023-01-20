import './garage-page.scss';

import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { Page } from '../../../shared/components/page';
import { Options } from '../../components/garage/options/options';
import { Counter } from '../../components/garage/counter/counter';
import { CarsList } from '../../components/garage/cars-list/cars-list';
import { Pagination } from '../../components/garage/pagination/pagination';

export class GaragePage extends Page {
  private optionsContainer: DOMElement;

  private options: Options;

  private contentContainer: DOMElement;

  private counter: Counter;

  private carList: CarsList;

  private paginationContainer: DOMElement;

  private pagination: Pagination;

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
    this.counter = new Counter(this.contentContainer.node);
    this.carList = new CarsList(this.contentContainer.node);
    this.pagination = new Pagination(this.paginationContainer.node);
  }
}
