import { template } from "./template";
import "../profile/styles.scss";
import Component from "../../services/component";

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
  const content = new Component("div", values);
  return { pageTitle: values.pageTitle, content: content };
};

export default signUpPage;
