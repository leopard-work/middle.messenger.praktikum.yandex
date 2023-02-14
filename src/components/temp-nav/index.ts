import Component from "../../services/component";
import Link from "../link";

const tempNav = () => {
  const tempNavTemplate = `
    {{0}}
    <nav class="temp-nav__items">
        <ul>
           <li>{{1}}</li>
           <li>{{2}}</li>
           <li>{{3}}</li>
           <li>{{4}}</li>
           <li>{{5}}</li>
           <li>{{6}}</li>
           <li>{{7}}</li>
           <li>{{8}}</li>
        </ul>
    </nav>
`;

  const title = new Component("div", {
    template: "Временная навигация (закрыть)",
    attr: {
      class: "temp-nav__title",
    },
    events: {
      click: (event: Event) => {
        event.preventDefault();
        const nav = title.getContent().closest(".temp-nav");
        if (nav != null) nav.remove();
      },
    },
  });

  const links = [
    title,
    Link({ children: "Страница чатов", href: "/" }),
    Link({ children: "Авторизация", href: "/sign-in" }),
    Link({ children: "Регистрация", href: "/sign-up" }),
    Link({ children: "Ошибка 404", href: "/page404" }),
    Link({ children: "Ошибка 500", href: "/page500" }),
    Link({ children: "Профиль", href: "/settings" }),
    Link({ children: "Изменить данные", href: "/settings/edit" }),
    Link({ children: "Изменить пароль", href: "/settings/password" }),
  ];

  const linksObj = Object.assign({}, links);

  return new Component("div", {
    template: tempNavTemplate,
    ...linksObj,
    attr: {
      class: "temp-nav",
    },
  });
};

export default tempNav;
