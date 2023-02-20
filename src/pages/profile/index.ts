import { template } from "./template";
import "./styles.scss";
import { setInputsValidate } from "../../components/form-validate";
import Link from "../../components/link";
import tempNav from "../../components/temp-nav";
import ProtectedPage from "../../components/protected-page";
import Component from "../../services/component";
import { apiUser } from "../../api/user";
import { router } from "../../index";
import { clearState } from "../../services/store/actions";

export const values = {
  title: "Профиль",
  photo: "Загрузить фото",
  email: "Почта",
  login: "Логин",
  name: "Имя",
  surname: "Фамилия",
  chat_name: "Имя в чате",
  phone: "Телефон",
  edit: "Изменить данные",
  edit_password: "Изменить пароль",
  sign_out: "Выйти",
  back: '<svg height="512px" style="enable-background:new 0 0 512 512;" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/></svg>',
  titleEdit: "Редактировать профиль",
  titleEditPassword: "Изменить пароль",
  oldPassword: "Старый пароль",
  newPassword: "Новый пароль",
  confirmPassword: "Повторите новый пароль",
  passwordBtn: "Сохранить",
};

const inputs = {
  emailBlock: {
    attr: {
      type: "email",
      name: "email",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.email,
      value: "test@mail.ru",
      disabled: "true",
    },
  },
  loginBlock: {
    attr: {
      type: "text",
      name: "login",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.login,
      disabled: "true",
    },
  },
  nameBlock: {
    attr: {
      type: "text",
      name: "first_name",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.name,
      disabled: "true",
    },
  },
  surnameBlock: {
    attr: {
      type: "text",
      name: "second_name",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.surname,
      disabled: "true",
    },
  },
  chatNameBlock: {
    attr: {
      type: "text",
      name: "display_name",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.chat_name,
      disabled: "true",
    },
  },
  phoneBlock: {
    attr: {
      type: "phone",
      name: "phone",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.phone,
      disabled: "true",
    },
  },
};

setInputsValidate(inputs);

const singOutButton = new Component("a", {
  ...values,
  template: "{{sign_out}}",
  attr: {
    href: "/",
  },
  events: {
    click: (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      apiUser.logOut().then((res) => {
        if (res.status === 200) {
          clearState();
          return;
        }
        router.goToError500();
      });
    },
  },
});

const profilePage = () => {
  return new ProtectedPage("div", {
    template: template,
    tempNav: tempNav(),
    backLink: Link({
      children: values.back,
      href: "/",
      class: "profile__back",
    }),
    loadPhotoLink: Link({
      children: values.photo,
      href: "/settings",
    }),
    ...values,
    ...inputs,
    editLink: Link({ children: values.edit, href: "/settings/edit" }),
    editPasswordLink: Link({
      children: values.edit_password,
      href: "/settings/password",
    }),
    signOutLink: singOutButton,
  });
};

export default profilePage;
