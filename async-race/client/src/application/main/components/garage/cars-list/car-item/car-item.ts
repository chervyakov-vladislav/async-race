import './car-item.scss';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { CarInterface } from '../../../../../shared/models/response-data';
import { CarIcon } from './car-icon';
import { ButtonElement } from '../../../../../shared/components/base-elements/button-element';
import { SVG } from '../../../../../shared/components/svg-icons';
import { listeners } from '../../../../services/listeners.service';

export class CarItem extends DOMElement {
  private icon: CarIcon;

  private row: DOMElement;

  public select: ButtonElement;

  public remove: ButtonElement;

  private carName: DOMElement;

  public play: ButtonElement;

  public pause: ButtonElement;

  constructor(parentNode: HTMLElement, carData: CarInterface) {
    super(parentNode, {
      tagName: 'li',
      classList: ['car-item'],
    });

    this.row = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['car-item__row'],
    });

    this.select = new ButtonElement(this.row.node, {
      tagName: 'button',
      classList: ['button', 'car-item__button'],
      content: 'select',
    });

    this.remove = new ButtonElement(this.row.node, {
      tagName: 'button',
      classList: ['button', 'car-item__button'],
      content: 'remove',
    });

    this.carName = new DOMElement(this.row.node, {
      tagName: 'div',
      classList: ['car-item__name'],
      content: carData.name,
    });

    this.row = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['car-item__row'],
    });

    this.play = new ButtonElement(this.row.node, {
      tagName: 'button',
      classList: ['button', 'car-item__play-pause'],
    });
    this.play.node.innerHTML = SVG.play;

    this.pause = new ButtonElement(this.row.node, {
      tagName: 'button',
      classList: ['button', 'car-item__play-pause'],
      disabled: true,
    });
    this.pause.node.innerHTML = SVG.pause;

    this.icon = new CarIcon(this.row.node, carData.color);
    listeners.appendCarItemLiseners(this, carData);
  }
}
