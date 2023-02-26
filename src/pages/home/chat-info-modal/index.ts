import Modal from "../../../components/modal";
import Link from "../../../components/link";
import chatAddModal from "../chat-add-modal";
import Component from "../../../services/component";

const chatInfoModalTemplate = `
  <h1 class="auth__title">Настройки чата</h1>
  <ul class="modal-info">
    <li>{{chatAddBtn}}</li>
    <li><a href="/">Удалить чат</a></li>
    <li><a href="/">Добавить пользователя</a></li>
    <li><a href="/">Удалить пользователя</a></li>
  </ul> 
`;

const chatInfoModalChildren = new Component("div", {
  template: chatInfoModalTemplate,
  chatAddBtn: Link({
    children: "Добавить чат",
    href: "/",
    onClick: () => {
      chatInfoModal.hide();
      chatAddModal.show();
    },
  }),
});

const chatInfoModal = new Modal("div", {
  children: chatInfoModalChildren,
});
chatInfoModal.hide();

export default chatInfoModal;