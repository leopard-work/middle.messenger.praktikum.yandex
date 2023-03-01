import validateTypes from "../../../utils/validate-types";
import {
  checkField,
  FormValidate,
  setInputsValidate,
} from "../../../components/form-validate";
import Component from "../../../services/component";
import Modal from "../../../components/modal";
import { apiUser } from "../../../api/user";
import { getActiveChat } from "../../../services/store/actions";
import { apiChat } from "../../../api/chat";
import { router } from "../../../index";
import { setInputsValidateProps } from "../../../utils/types";

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
          const link = event.target as HTMLElement;
          const id = link.getAttribute("id");
          if (id) {
            const chat = getActiveChat();
            if (id && chat.id !== -1) {
              const data = {
                users: [id],
                chatId: chat.id,
              };
              apiChat
                .addUser(data)
                .then((res) => {
                  if (res.status !== 200) {
                    router.goToError500();
                  }
                })
                .catch(() => {
                  router.goToError500();
                });
            }
            chatAddUserModal.hide();
          }
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

setInputsValidate(inputs as unknown as Record<string, setInputsValidateProps>);

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
              res.response.map((item: Record<string, unknown>, i: number) => {
                usersArr[i].setProps({ login: item.login, id: item.id });
              });
              users.show();
            } else {
              users.hide();
              empty.show();
            }
          }
        });
      } else {
        empty.show();
        loading.hide();
        users.hide();
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
chatAddUserModal.hide();

export default chatAddUserModal;
