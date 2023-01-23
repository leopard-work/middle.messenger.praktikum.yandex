import { template } from "./template";
import { editTemplate } from "./template_edit";
import { editPasswordTemplate } from "./template_edit_password";
import "./styles.scss";
import Component from "../../services/component";

const values = {
  pageTitle: "Профиль",
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
  pageTitleEdit: "Редактировать профиль",
  titleEdit: "Редактировать профиль",
  pageTitleEditPassword: "Изменить пароль",
  titleEditPassword: "Изменить пароль",
  oldPassword: "Старый пароль",
  newPassword: "Новый пароль",
  confirmPassword: "Повторите новый пароль",
  passwordBtn: "Сохранить",
};

export const profilePage = () => {
  const content = new Component("div", { ...values, template: template });
  return { pageTitle: values.pageTitle, content: content };
};

export const editProfilePage = () => {
  const content = new Component("div", { ...values, template: editTemplate });
  return { pageTitle: values.pageTitleEdit, content: content };
};

export const editProfilePasswordPage = () => {
  const content = new Component("div", {
    ...values,
    template: editPasswordTemplate,
  });
  return { pageTitle: values.pageTitleEditPassword, content: content };
};
