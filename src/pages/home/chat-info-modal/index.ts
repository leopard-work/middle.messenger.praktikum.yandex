import Modal from "../../../components/modal";
import Link from "../../../components/link";
import chatAddModal from "../chat-add-modal";
import Component from "../../../services/component";
import { avatarInput, chatDelete } from "../index";
import chatAddUserModal from "../chat-add-user-modal";
import chatDeleteUserModal, {
  chatDeleteGetUsers,
} from "../chat-delete-user-modal";

const chatInfoModalTemplate = `
  <h1 class="auth__title">Настройки чата</h1>
  <ul class="modal-info">
    <li>{{chatAddBtn}}</li>
    <li><a href="/">{{chatDelete}}</a></li>
    <li><a href="/">{{chatAddUserBtn}}</a></li>
    <li><a href="/">{{chatDeleteUserBtn}}</a></li>
    <li><a href="/">{{chatAvatarLoad}}</a></li>
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
  chatDeleteUserBtn: Link({
    children: "Удалить пользователя",
    href: "/",
    onClick: () => {
      chatInfoModal.hide();
      chatDeleteGetUsers();
      chatDeleteUserModal.show();
    },
  }),
  chatAvatarLoad: Link({
    children: "Изменить аватар чата",
    href: "/",
    onClick: () => {
      chatInfoModal.hide();
      avatarInput.click();
    },
  }),
});

const chatInfoModal = new Modal("div", {
  children: chatInfoModalChildren,
});
chatInfoModal.hide();

export default chatInfoModal;
