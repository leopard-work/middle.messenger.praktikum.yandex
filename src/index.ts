import "reset-css";
import "./styles.scss";
import { Router } from "./services/router";

import homePage from "./pages/home/index";
import signInPage from "./pages/sign-in";
import signUpPage from "./pages/sign-up";
import error404Page from "./pages/error404";
import error500Page from "./pages/error500";
import profilePage from "./pages/profile";
import editProfilePage from "./pages/profile/edit";
import editProfilePasswordPage from "./pages/profile/editPassword";
import { Actions } from "./services/store";
import Store from "./services/store/store";

export const store = new Store();

console.log(Actions.getCustomState());

Actions.addCustomData("aaa");

setTimeout(() => {
  Actions.addCustomData("bbb");
}, 5000);

//console.log(Actions.getCustomState());

export const router = new Router("#root");

router.setErrorPage(error404Page);
router.setProtectedPath("/sign-in");

router
  .use("", homePage, "Страница чатов", true)
  .use("/sign-in", signInPage, "Авторизация")
  .use("/sign-up", signUpPage, "Регистрация")
  .use("/page404", error404Page, "Ошибка 404")
  .use("/page500", error500Page, "Ошибка 500")
  .use("/settings", profilePage, "Профиль", true)
  .use("/settings/edit", editProfilePage, "Редактировать профиль", true)
  .use("/settings/password", editProfilePasswordPage, "Изменить пароль", true)
  .start();
