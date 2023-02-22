import Component from "../../services/component";

const modalTpl = `
    <div class="modal">
        <div class="modal__wrapper">
            <div class="modal-block">
                {{close}}
                {{children}}
            </div>
        </div>
      </div>
`;

const closeBtn = new Component("div", {
  attr: {
    class: "modal-block__close",
  },
  events: {
    click: (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      modalBlock.hide();
    },
  },
});

class Modal extends Component {
  render() {
    this.children = { ...this.children, close: closeBtn };
    return this.compile(modalTpl, { ...this.props });
  }
}

const modalBlock = new Modal("div", {});

const modal = () => {
  return modalBlock;
};

export default modal;

// <h1 class="auth__title">Добавить чат</h1>
// <label class="auth__input-text-wrapper">
// <input type="text" name="first_name" class="input-text" placeholder="Название чата">
//     </label>
//     <div class="auth__button-wrapper">
// <button type="submit" class="input-button auth__button profile__button">Добавить</button>
//     </div>
