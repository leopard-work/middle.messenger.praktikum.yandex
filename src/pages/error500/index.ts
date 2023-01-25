import { template } from "../error404/template";
import "../error404/styles.scss";
import Component from "../../services/component";
import Link from "../../components/link";
import tempNav from "../../components/temp-nav";

const error500Page = () => {
  const values = {
    template: template,
    tempNav: tempNav(),
    pageTitle: "Ошибка 500",
    title: "Ошибка 500",
    text: "Ошибка сервера, попробуйте зайти позже",
    backLink: Link({ children: "Назад к чатам", href: "/" }),
  };
  const content = new Component("div", values);
  return { pageTitle: values.pageTitle, content: content };
};

export default error500Page;
