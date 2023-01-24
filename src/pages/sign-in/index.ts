import { template } from "./template";
import "../profile/styles.scss";
import Component from "../../services/component";
import validateTypes from "../../utils/validate-types";
import { FormValidate, inputsValidate } from "../../components/form-validate";
import { form_template } from "./template-form";

const values = {
  pageTitle: "Авторизация",
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
      ...validateTypes.empty,
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
      ...validateTypes.empty,
      class: "auth_error",
    },
  },
};

inputsValidate(inputs);

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

const signInPage = () => {
  const content = new Component("div", {
    ...values,
    template: template,
    form: form,
  });
  return { pageTitle: values.pageTitle, content: content };
};

export default signInPage;
