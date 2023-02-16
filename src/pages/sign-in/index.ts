import { template } from "./template";
import "../profile/styles.scss";
import Component from "../../services/component";
import validateTypes from "../../utils/validate-types";
import {
  FormValidate,
  setInputsValidate,
} from "../../components/form-validate";
import { form_template } from "./template-form";
import Link from "../../components/link";
import tempNav from "../../components/temp-nav";
import { Connect } from "../../services/store";
import { storeProps } from "../../utils/types";

const values = {
  title: "Авторизация",
  login: "Логин",
  password: "Пароль",
  button: "Вход",
  reg_link: "Ещё не зарегистрированы?",
  error: "Ошибка ошибка ошибка",
};

const inputs = {
  loginBlock: {
    attr: {
      type: "text",
      name: "login",
      class: "input-text auth__input-text",
      placeholder: values.login,
    },
    validate: {
      ...validateTypes.login,
      class: "auth_error",
    },
  },
  passwordBlock: {
    attr: {
      type: "password",
      name: "password",
      class: "input-text auth__input-text",
      placeholder: values.password,
    },
    validate: {
      ...validateTypes.password,
      class: "auth_error",
    },
  },
};

setInputsValidate(inputs);

const formButton = new Component("button", {
  ...values,
  template: "{{ button }}",
  attr: {
    type: "submit",
    class: "input-button auth__button",
  },
});

const form = new FormValidate("form", {
  ...values,
  ...inputs,
  buttonBlock: formButton,
  template: form_template,
  signUpLink: Link({ children: values.reg_link, href: "/sign-up" }),
  attr: {
    class: "auth",
  },
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      if (form.checkFields()) {
        const values = new FormData(form.getContent() as HTMLFormElement);
        const data: Record<string, FormDataEntryValue> = {};
        for (const pair of values.entries()) {
          data[pair[0]] = pair[1];
        }
        console.log(data);
        (form.getContent() as HTMLFormElement).reset();
        form.children.buttonBlock.setProps({
          button: "Отправлено",
          attr: {
            disabled: "true",
          },
        });
      }
    },
  },
});

class ProtectedPage extends Connect(
  Component,
  (state: storeProps) => state.user.userCheck
) {}

const signInPage = () => {
  return new ProtectedPage("div", {
    tempNav: tempNav(),
    ...values,
    template: template,
    form: form,
  });
};

export default signInPage;
