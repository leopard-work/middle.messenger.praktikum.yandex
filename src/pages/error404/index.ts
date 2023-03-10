import { template } from "./template";
import "./styles.scss";
import Component from "../../services/component";
import Link from "../../components/link";

const error404Page = () => {
  const values = {
    template: template,
    title: "Ошибка 404",
    text: "Извините, такой страницы нет",
    backLink: Link({ children: "Назад к чатам", href: "/" }),
  };
  return new Component("div", values);
};

export default error404Page;
