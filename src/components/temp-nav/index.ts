import Component from "../../services/component";
import Link from "../link";

const tempNav = () => {
  const tempNavTemplate = `
    {{0}}
    <nav class="temp-nav__items">
        <ul>
           {{1}} {{2}} {{3}} {{4}} {{5}} {{6}} {{7}} {{8}}
        </ul>
    </nav>
`

  const title = new Component('div', {
    template: "Временная навигация (закрыть)",
    attr: {
      class: 'temp-nav__title'
    },
    events: {
      click: (event: Event) => {
        event.preventDefault();
        const nav = title.getContent().closest('.temp-nav');
        if (nav!=null) nav.remove()
      }
    }
  })

  const links = [
    title,
    Link({ title: "Страница чатов", href: "/" }),
    Link({ title: "Авторизация", href: "/sign-in" }),
    Link({ title: "Регистрация", href: "/sign-up" }),
    Link({ title: "Ошибка 404", href: "/page404" }),
    Link({ title: "Ошибка 500", href: "/page500" }),
    Link({ title: "Профиль", href: "/profile" }),
    Link({ title: "Изменить данные", href: "/profile/edit" }),
    Link({ title: "Изменить пароль", href: "/profile/password" }),
  ]

  const linksObj = Object.assign({}, links);

  return new Component('div', {
    template: tempNavTemplate,
    ...linksObj,
    attr: {
      class: 'temp-nav'
    }
  });
};

export default tempNav;

