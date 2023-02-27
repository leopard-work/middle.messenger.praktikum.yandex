import validateTypes from "../../../utils/validate-types";
import {
  checkField,
  FormValidate,
  setInputsValidate,
} from "../../../components/form-validate";
import Component from "../../../services/component";
import Modal from "../../../components/modal";
import { apiUser } from "../../../api/user";

const chatAddUserModalTpl = `
  <h1 class="auth__title">Добавить пользователя</h1>
  <label class="auth__input-text-wrapper">{{inpName}}</label>
  <div class="modal-users">
    {{loading}}
    {{empty}}
    {{users}}
  </div>
`;

const loading = new Component("p", {
  template: "Загрузка...",
});
loading.hide();

const empty = new Component("p", {
  template: "Подходящих результатов нет",
});

const users = new Component("ul", {
  template: `
        <li><a href="/">user1</a></li>
        <li><a href="/">user2</a></li>
        <li><a href="/">user3</a></li>
        <li><a href="/">user1</a></li>
        <li><a href="/">user2</a></li>
        <li><a href="/">user3</a></li>
        <li><a href="/">user1</a></li>
        <li><a href="/">user2</a></li>
        <li><a href="/">user3</a></li>
        <li><a href="/">user3</a></li>
    `,
});
users.hide();

const inputs = {
  inpName: {
    attr: {
      name: "login",
      class: "input-text",
      placeholder: "Логин пользователя для поиска",
    },
    validate: {
      ...validateTypes.login,
      class: "auth_error",
    },
  },
};

setInputsValidate(inputs);

const input = inputs.inpName as unknown as Component;

input.setProps({
  attr: {
    value: "",
  },
  events: {
    keyup: (event: Event) => {
      const target = event.target as HTMLFormElement;
      const value = target.value;
      if (checkField(inputs.inpName as unknown as Component, value)) {
        empty.hide();
        loading.show();
        users.hide();
        apiUser.searchUser({ login: value }).then((res) => {
          if (res.status === 200) {
            loading.hide();
            if (res.response.length) {
              users.show();
            } else {
              users.hide();
              empty.show();
            }
          }
        });
      } else {
        console.log("clear");
      }
    },
  },
});

const chatModalUserAddForm = new FormValidate("form", {
  template: chatAddUserModalTpl,
  ...inputs,
  loading: loading,
  users: users,
  empty: empty,
});

const chatAddUserModal = new Modal("div", {
  children: chatModalUserAddForm,
});

export default chatAddUserModal;
