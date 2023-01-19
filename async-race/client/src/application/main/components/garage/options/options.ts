import './options.scss';

import { ButtonElement } from '../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../shared/components/base-elements/input-element';

export class Options extends DOMElement {
  private row: DOMElement;

  private createInput: InputElement;

  private colorCreateInput: InputElement;

  private createButton: ButtonElement;

  private updateInput: InputElement;

  private colorUpdateInput: InputElement;

  private updateButton: ButtonElement;

  private raceButton: ButtonElement;

  private resetButton: ButtonElement;

  private generateButton: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['options'],
    });

    this.row = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['options__row'],
    });

    this.createInput = new InputElement(this.row.node, {
      tagName: 'input',
      type: 'text',
      classList: ['options__input-text'],
      placeholder: 'car name',
    });

    this.colorCreateInput = new InputElement(this.row.node, {
      tagName: 'input',
      type: 'color',
      classList: ['options__input-color'],
      value: '#ffeac8',
    });

    this.createButton = new ButtonElement(this.row.node, {
      tagName: 'button',
      classList: ['button', 'options__button'],
      content: 'create',
    });

    this.row = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['options__row'],
    });

    this.updateInput = new InputElement(this.row.node, {
      tagName: 'input',
      type: 'text',
      classList: ['options__input-text'],
      placeholder: 'car name',
    });

    this.colorUpdateInput = new InputElement(this.row.node, {
      tagName: 'input',
      type: 'color',
      classList: ['options__input-color'],
      value: '#ffeac8',
    });

    this.updateButton = new ButtonElement(this.row.node, {
      tagName: 'button',
      classList: ['button', 'options__button'],
      content: 'update',
      disabled: true,
    });

    this.row = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['options__row'],
    });

    this.raceButton = new ButtonElement(this.row.node, {
      tagName: 'button',
      classList: ['button', 'options__button'],
      content: 'race',
    });

    this.resetButton = new ButtonElement(this.row.node, {
      tagName: 'button',
      classList: ['button', 'options__button'],
      content: 'reset',
    });

    this.generateButton = new ButtonElement(this.row.node, {
      tagName: 'button',
      classList: ['button', 'options__button'],
      content: 'generate',
    });
  }
}
