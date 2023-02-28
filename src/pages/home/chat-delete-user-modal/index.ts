import Component from "../../../services/component";
import validateTypes from "../../../utils/validate-types";
import {
  FormValidate,
  setInputsValidate,
} from "../../../components/form-validate";
import Modal from "../../../components/modal";
import { apiChat } from "../../../api/chat";
import { getActiveChat } from "../../../services/store/actions";

const chatAddUserModalTpl = `
  <h1 class="auth__title">Удалить пользователя</h1>
  <label class="auth__input-text-wrapper">{{inpName}}</label>
  <div class="modal-users">
    {{loading}}
    {{users}}
  </div>
`;

const loading = new Component("p", {
  template: "Загрузка...",
});

const usersArr: Component[] = [];
for (let i = 0; i < 10; i++) {
  usersArr.push(
    new Component("li", {
      template: `<a href="/" id="{{id}}">{{login}}</a>`,
      login: "",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          alert("ok");
        },
      },
    })
  );
}

const users = new Component("ul", {
  template: "{{users}}",
  users: usersArr,
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
      console.log(value);
      const activeChat = getActiveChat();
      apiChat.deleteUser({ id: activeChat.id }).then((res) => {
        if (res.status == 200) {
          loading.hide();
          usersArr.map((item) => item.hide());
          res.response.map((item, i: number) => {
            usersArr[i].setProps({ login: item.login, id: item.id });
            usersArr[i].show();
          });
          users.show();
        }
      });
    },
  },
});

const chatModalUserDeleteForm = new FormValidate("form", {
  template: chatAddUserModalTpl,
  ...inputs,
  loading: loading,
  users: users,
});

const chatDeleteUserModal = new Modal("div", {
  children: chatModalUserDeleteForm,
});
chatDeleteUserModal.hide();

export default chatDeleteUserModal;
