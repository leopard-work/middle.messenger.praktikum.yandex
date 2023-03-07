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
import { apiUser } from "../../api/user";
import { router } from "../../index";
import { setUser } from "../../services/store/actions";
import CloseFromUserPage from "../../components/close-from-user-page";
import { setInputsValidateProps, signUpProps } from "../../utils/types";

const signUpPage = () => {
  const values = {
    template: template,
    title: "Регистрация",
    email: "Почта",
    login: "Логин",
    name: "Имя",
    surname: "Фамилия",
    phone: "Телефон",
    password: "Пароль",
    password_confirm: "Пароль (ещё раз)",
    button: "Зарегистрироваться",
    error: "",
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

  setInputsValidate(
    inputs as unknown as Record<string, setInputsValidateProps>
  );

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
    signInLink: Link({ children: values.login_link, href: "/" }),
    template: form_template,
    attr: {
      class: "auth",
    },
    events: {
      submit: async (event: Event) => {
        event.preventDefault();
        if (form.checkFields()) {
          const formValues = new FormData(form.getContent() as HTMLFormElement);
          const data: Record<string, FormDataEntryValue> = {};
          for (const pair of formValues.entries()) {
            data[pair[0]] = pair[1];
          }
          const block = form.children.buttonBlock as Component;
          block.setProps({
            button: "Загрузка...",
            attr: {
              disabled: "true",
            },
          });

          let registerCheck = false;

          await apiUser.signUp(data as signUpProps).then((res) => {
            (form.children.buttonBlock as Component).setProps({
              button: values.button,
              attr: {
                disabled: "false",
              },
            });
            if (res.status === 200) {
              form.setProps({ error: "" });
              (form.getContent() as HTMLFormElement).reset();
              registerCheck = true;
              return;
            }
            if (res.response.reason === "Login already exists") {
              form.setProps({ error: "Такой пользователь уже существует" });
              (form.children.loginBlock as Component).addClass("input-error");
              return;
            }
            if (res.response.reason === "Email already exists") {
              form.setProps({
                error: "Пользователь с такой почтой уже существует",
              });
              (form.children.emailBlock as Component).addClass("input-error");
              return;
            }
            form.setProps({ error: "Произошла ошибка, повторите позже" });
          });

          if (registerCheck) {
            apiUser.userInfo().then((res) => {
              if (res.status === 200) {
                setUser(res.response);
                router.go("/messenger");
                return;
              }
              router.goToError500();
            });
          }
        }
      },
    },
  });

  return new CloseFromUserPage("div", {
    ...values,
    template: template,
    form: form,
  });
};

export default signUpPage;
