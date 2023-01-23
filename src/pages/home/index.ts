import { template } from "./template";
import "./styles.scss";
import Component from "../../services/component";

const homePage = () => {
  const values = {
    template: template,
    pageTitle: "Страница чатов",
    search_placeholder: "Поиск...",
    message_placeholder: "Сообщение...",
  };
  const content = new Component("div", values);
  return { pageTitle: values.pageTitle, content: content };
};

export default homePage;
