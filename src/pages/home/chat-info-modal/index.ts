import Modal from "../../../components/modal";
import Link from "../../../components/link";
import chatAddModal from "../chat-add-modal";
import Component from "../../../services/component";
import { chatDelete } from "../index";
import chatAddUserModal from "../chat-add-user-modal";

const chatInfoModalTemplate = `
  <h1 class="auth__title">Настройки чата</h1>
  <ul class="modal-info">
    <li>{{chatAddBtn}}</li>
    <li><a href="/">{{chatDelete}}</a></li>
    <li><a href="/">{{chatAddUserBtn}}</a></li>
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
  chatDelete: Link({
    children: "Удалить чат",
    href: "/",
    onClick: () => {
      chatInfoModal.hide();
      chatDelete();
    },
  }),
  chatAddUserBtn: Link({
    children: "Добавить пользователя",
    href: "/",
    onClick: () => {
      chatInfoModal.hide();
      chatAddUserModal.show();
    },
  }),
});

const chatInfoModal = new Modal("div", {
  children: chatInfoModalChildren,
});
chatInfoModal.hide();

export default chatInfoModal;
