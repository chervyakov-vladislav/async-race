import './options.scss';

import { ButtonElement } from '../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../shared/components/base-elements/input-element';
import { listeners } from '../../../services/listeners.service';

export class Options extends DOMElement {
  private row: DOMElement;

  public createInput: InputElement;

  public colorCreateInput: InputElement;

  public createButton: ButtonElement;

  private updateInput: InputElement;

  private colorUpdateInput: InputElement;

  public updateButton: ButtonElement;

  public raceButton: ButtonElement;

  public resetButton: ButtonElement;

  public generateButton: ButtonElement;

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
      value: '#ffc261',
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
    listeners.updateTextInput = this.updateInput.node as HTMLInputElement;

    this.colorUpdateInput = new InputElement(this.row.node, {
      tagName: 'input',
      type: 'color',
      classList: ['options__input-color'],
      value: '#ffc261',
    });
    listeners.updateColorInput = this.colorUpdateInput.node as HTMLInputElement;

    this.updateButton = new ButtonElement(this.row.node, {
      tagName: 'button',
      classList: ['button', 'options__button'],
      content: 'update',
      disabled: true,
    });
    listeners.updateButton = this.updateButton.node as HTMLButtonElement;

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

    listeners.appendOptionsListeners(this);
  }
}
