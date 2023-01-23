import { template } from "./template";
import "../profile/styles.scss";
import Component from "../../services/component";

const signInPage = () => {
  const values = {
    template: template,
    pageTitle: "Авторизация",
    title: "Авторизация",
    login: "Логин",
    password: "Пароль",
    button: "Вход",
    reg_link: "Ещё не зарегистрированы?",
    error: "Ошибка ошибка ошибка",
  };
  const content = new Component("div", values);
  return { pageTitle: values.pageTitle, content: content };
};

export default signInPage;
