import {
  FormValidate,
  setInputsValidate,
} from "../../../components/form-validate";
import Modal from "../../../components/modal";
import validateTypes from "../../../utils/validate-types";
import Component from "../../../services/component";
import { apiChat } from "../../../api/chat";
import { chatAddProps } from "../../../utils/types";
import { router } from "../../../index";
import { setChatList } from "../../../services/store/actions";

const chatAddModalTpl = `
  <h1 class="auth__title">Добавить чат</h1>
  <label class="auth__input-text-wrapper">{{inpName}}</label>
  <div class="auth__button-wrapper">{{button}}</div>
`;

const inputs = {
  inpName: {
    attr: {
      name: "title",
      class: "input-text",
      placeholder: "Название чата",
    },
    validate: {
      ...validateTypes.empty,
      class: "auth_error",
    },
  },
};

setInputsValidate(inputs);

const button = new Component("button", {
  template: "Добавить",
  attr: {
    type: "submit",
    class: "input-button auth__button profile__button",
  },
});

const chatModalAddForm = new FormValidate("form", {
  template: chatAddModalTpl,
  ...inputs,
  button: button,
  events: {
    submit: async (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      if (chatModalAddForm.checkFields()) {
        const formValues = new FormData(
          chatModalAddForm.getContent() as HTMLFormElement
        );
        const data: Record<string, FormDataEntryValue> = {};
        for (const pair of formValues.entries()) {
          data[pair[0]] = pair[1];
        }
        (chatModalAddForm.children.button as Component).setProps({
          template: "Загрузка...",
          attr: {
            disabled: "true",
          },
        });

        let addChatCheck = false;

        await apiChat
          .add(data as chatAddProps)
          .then((res) => {
            (chatModalAddForm.children.button as Component).setProps({
              template: "Добавить",
              attr: {
                disabled: "false",
              },
            });

            if (res.status === 200) {
              addChatCheck = true;
              (chatModalAddForm.getContent() as HTMLFormElement).reset();
              chatAddModal.hide();
              return;
            }
            router.goToError500();
          })
          .catch(() => {
            router.goToError500();
          });

        if (addChatCheck) {
          await apiChat.get().then((res) => {
            setChatList(res.response);
          });
        }
      }
    },
  },
});

const chatAddModal = new Modal("div", {
  children: chatModalAddForm,
});
chatAddModal.hide();

export default chatAddModal;
