import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { SVG } from '../../../../../shared/components/svg-icons';

export class CarIcon extends DOMElement {
  private decoration: DOMElement;

  private flag: DOMElement;

  constructor(parentNode: HTMLElement, color = '#000') {
    super(parentNode, {
      tagName: 'div',
      classList: ['icon-container'],
    });
    this.node.innerHTML = `<svg class="car-icon" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
      <path fill="${color}" d="M544 192h-16L419.22 56.02A64.025 64.025 0 0 0 369.24 32H155.33c-26.17 0-49.7 15.93-59.42 40.23L48 194.26C20.44 201.4 0 226.21 0 256v112c0
      8.84 7.16 16 16 16h48c0 53.02 42.98 96 96 96s96-42.98 96-96h128c0 53.02 42.98 96 96 96s96-42.98 96-96h48c8.84 0 16-7.16 16-16v-80c0-53.02-42.98-96-96-96zM160
      432c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48zm72-240H116.93l38.4-96H232v96zm48 0V96h89.24l76.8 96H280zm200
      240c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48z"/></svg>`;

    this.decoration = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['road'],
    });

    this.flag = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['road__flag'],
    });
    this.flag.node.innerHTML = SVG.finish;
  }
}
