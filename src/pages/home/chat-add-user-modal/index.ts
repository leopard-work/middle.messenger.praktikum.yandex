import validateTypes from "../../../utils/validate-types";
import {
  FormValidate,
  setInputsValidate,
  validateInput,
} from "../../../components/form-validate";
import Component from "../../../services/component";
import Modal from "../../../components/modal";

const chatAddUserModalTpl = `
  <h1 class="auth__title">Добавить пользователя</h1>
  <label class="auth__input-text-wrapper">{{inpName}}</label>
  <div class="auth__button-wrapper">{{button}}</div>
`;

const inputs = {
  inpName: {
    attr: {
      name: "login",
      class: "input-text",
      placeholder: "Логин пользователя",
    },
    validate: {
      ...validateTypes.login,
      class: "auth_error",
    },
  },
};

setInputsValidate(inputs);

(inputs.inpName as unknown as Component).setProps({
  attr: {
    value: "",
  },
  events: {
    keyup: (event: Event) => {
      validateInput(event, inputs.inpName as unknown as Component);
    },
  },
});

const button = new Component("button", {
  template: "Добавить",
  attr: {
    type: "submit",
    class: "input-button auth__button profile__button",
    disabled: "true",
  },
});

const chatModalUserAddForm = new FormValidate("form", {
  template: chatAddUserModalTpl,
  ...inputs,
  button: button,
});

const chatAddUserModal = new Modal("div", {
  children: chatModalUserAddForm,
});

export default chatAddUserModal;
