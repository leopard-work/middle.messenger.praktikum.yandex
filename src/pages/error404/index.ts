import { template } from "./template";
import "./styles.scss";
import Component from "../../services/component";

const error404Page = () => {
  const values = {
    template: template,
    pageTitle: "Ошибка 404",
    title: "Ошибка 404",
    text: "Извините, такой страницы нет",
    link: "Назад к чатам",
  };
  const content = new Component("div", values);
  return { pageTitle: values.pageTitle, content: content };
};

export default error404Page;
