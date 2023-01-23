import { template } from "../error404/template";
import "../error404/styles.scss";
import Component from "../../services/component";

const error500Page = () => {
  const values = {
    template: template,
    pageTitle: "Ошибка 500",
    title: "Ошибка 500",
    text: "Ошибка сервера, попробуйте зайти позже",
    link: "Назад к чатам",
  };
  const content = new Component("div", values);
  return { pageTitle: values.pageTitle, content: content };
};

export default error500Page;
