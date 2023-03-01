import { template } from "../error404/template";
import "../error404/styles.scss";
import Component from "../../services/component";
import Link from "../../components/link";

const error500Page = () => {
  const values = {
    template: template,
    title: "Ошибка 500",
    text: "Ошибка сервера, попробуйте зайти позже",
    backLink: Link({ children: "Назад к чатам", href: "/" }),
  };
  return new Component("div", values);
};

export default error500Page;
