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
import { apiUser } from "../../api/user";
import { setChatList, setUser } from "../../services/store/actions";
import { router } from "../../index";
import CloseFromUserPage from "../../components/close-from-user-page";
import { signIpProps } from "../../utils/types";
import { apiChat } from "../../api/chat";

const values = {
  title: "Авторизация",
  login: "Логин",
  password: "Пароль",
  button: "Вход",
  reg_link: "Ещё не зарегистрированы?",
  error: "",
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
    submit: async (event: Event) => {
      event.preventDefault();
      if (form.checkFields()) {
        const formValues = new FormData(form.getContent() as HTMLFormElement);
        const data: Record<string, FormDataEntryValue> = {};
        for (const pair of formValues.entries()) {
          data[pair[0]] = pair[1];
        }
        (form.children.buttonBlock as Component).setProps({
          button: "Загрузка...",
          attr: {
            disabled: "true",
          },
        });

        let loginCheck = false;

        await apiUser.signIn(data as signIpProps).then((res) => {
          (form.children.buttonBlock as Component).setProps({
            button: values.button,
            attr: {
              disabled: "false",
            },
          });
          if (res.status === 500) router.goToError500();
          if (res.status === 200) {
            form.setProps({ error: "" });
            (form.getContent() as HTMLFormElement).reset();
            loginCheck = true;
            return;
          }
          if (res.response.reason === "Login or password is incorrect") {
            form.setProps({
              error: "Неверный логин или пароль",
            });
            return;
          }
          form.setProps({ error: "Произошла ошибка, повторите позже" });
        });

        if (loginCheck) {
          await apiUser.userInfo().then((res) => {
            if (res.status === 200) {
              setUser(res.response);
              apiChat.get().then((res) => {
                setChatList(res.response);
              });
              router.go("/");
              return;
            }
            router.goToError500();
          });
        }
      }
    },
  },
});

const signInPage = () => {
  return new CloseFromUserPage("div", {
    tempNav: tempNav(),
    ...values,
    template: template,
    form: form,
  });
};

export default signInPage;
