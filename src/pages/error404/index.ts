import { template } from "./template";
import "./styles.scss";
import Component from "../../services/component";
import Link from "../../components/link";
import tempNav from "../../components/temp-nav";

const error404Page = () => {
  const values = {
    template: template,
    tempNav: tempNav(),
    pageTitle: "Ошибка 404",
    title: "Ошибка 404",
    text: "Извините, такой страницы нет",
    backLink: Link({ children: "Назад к чатам", href: "/" }),
  };
  const content = new Component("div", values);
  return { pageTitle: values.pageTitle, content: content };
};

export default error404Page;
