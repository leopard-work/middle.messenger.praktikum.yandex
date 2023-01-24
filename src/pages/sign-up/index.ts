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

const signUpPage = () => {
  const values = {
    template: template,
    pageTitle: "Регистрация",
    title: "Регистрация",
    email: "Почта",
    login: "Логин",
    name: "Имя",
    surname: "Фамилия",
    phone: "Телефон",
    password: "Пароль",
    password_confirm: "Пароль (ещё раз)",
    button: "Зарегистрироваться",
    error: "Ошибка ошибка ошибка",
    login_link: "Войти",
  };

  const inputs = {
    emailBlock: {
      attr: {
        type: "email",
        name: "email",
        class: "input-text auth__input-text",
        placeholder: values.email,
      },
      validate: {
        ...validateTypes.email,
        class: "auth_error",
      },
    },
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
    nameBlock: {
      attr: {
        type: "text",
        name: "first_name",
        class: "input-text auth__input-text",
        placeholder: values.name,
      },
      validate: {
        ...validateTypes.name,
        class: "auth_error",
      },
    },
    surnameBlock: {
      attr: {
        type: "text",
        name: "second_name",
        class: "input-text auth__input-text",
        placeholder: values.surname,
      },
      validate: {
        ...validateTypes.name,
        class: "auth_error",
      },
    },
    phoneBlock: {
      attr: {
        type: "tel",
        name: "phone",
        class: "input-text auth__input-text",
        placeholder: values.phone,
      },
      validate: {
        ...validateTypes.phone,
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
    passwordConfirmBlock: {
      attr: {
        type: "password",
        name: "password_confirm",
        class: "input-text auth__input-text",
        placeholder: values.password_confirm,
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
    signInLink: Link({ title: "Войти", href: "/sign-in" }),
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

  const content = new Component("div", {
    tempNav: tempNav(),
    ...values,
    template: template,
    form: form,
  });
  return { pageTitle: values.pageTitle, content: content };
};

export default signUpPage;
