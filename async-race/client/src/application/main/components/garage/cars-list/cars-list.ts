import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { apiService } from '../../../../shared/services/api.service';

export class CarsList extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['car-list'],
    });

    this.consolelog();
  }

  private async consolelog() {
    console.log(await apiService.getAllCars());
  }
}
