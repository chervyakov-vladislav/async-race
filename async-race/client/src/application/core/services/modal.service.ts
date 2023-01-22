import { ModalPage } from '../components/modal/modal';

class ModalService {
  public modal: ModalPage;

  constructor() {
    this.modal = new ModalPage('modal');
  }

  public appendModal(text: string) {
    this.modal.message.node.innerText = text;
    document.body.append(this.modal.node);
  }

  public removeModal() {
    this.modal.node.remove();
  }
}

const modalService = new ModalService();
export { modalService };
