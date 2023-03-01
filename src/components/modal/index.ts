import Component from "../../services/component";

const modalTpl = `
    <div class="modal">
      <div class="modal__wrapper">
          <div class="modal-block">
              <div class="modal-block__close" data-close="true"></div>
              {{children}}
          </div>
      </div>
    </div>
`;

class Modal extends Component {
  addEvents() {
    if (this._element) {
      this._element.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (target.dataset["close"]) this.hide();
      });
    }
  }

  render() {
    return this.compile(modalTpl, { ...this.props });
  }
}

export default Modal;
