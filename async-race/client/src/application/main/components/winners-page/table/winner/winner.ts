import './winner.scss';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { CarInterface, WinnerInterface } from '../../../../../shared/models/response-data';
import { WinnerIcon } from './icon/winner-icon';

export class WinnerItem extends DOMElement {
  private index: DOMElement;

  private icon: WinnerIcon | null;

  private name: DOMElement;

  private wins: DOMElement;

  private time: DOMElement;

  constructor(parentNode: HTMLElement, winnerData: WinnerInterface, carData: CarInterface, index: number) {
    super(parentNode, {
      tagName: 'li',
      classList: ['winner-item'],
    });

    this.index = new DOMElement(this.node, {
      tagName: 'p',
      classList: ['winner-item__count'],
      content: `${index + 1}`,
    });

    this.icon = carData ? new WinnerIcon(this.node, carData.color) : null;

    this.name = new DOMElement(this.node, {
      tagName: 'p',
      classList: ['winner-item__name'],
      content: carData.name,
    });

    this.wins = new DOMElement(this.node, {
      tagName: 'p',
      classList: ['winner-item__wins'],
      content: `${winnerData.wins}`,
    });

    this.time = new DOMElement(this.node, {
      tagName: 'p',
      classList: ['winner-item__time'],
      content: `${winnerData.time}`,
    });
  }
}
