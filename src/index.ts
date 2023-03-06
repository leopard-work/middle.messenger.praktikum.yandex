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

export const router = new Router("#root");

router.setError404Page(error404Page);
router.setError500Path("/page500");
routerq.setProtectUserPath("/");
router.setProtectNoUserPath("/messenger");

router
  .use("/messenger", homePage, "Страница чатов", true, false)
  .use("", signInPage, "Авторизация", false, true)
  .use("/sign-up", signUpPage, "Регистрация", false, true)
  .use("/page404", error404Page, "Ошибка 404", false, false)
  .use("/page500", error500Page, "Ошибка 500", false, false)
  .use("/settings", profilePage, "Профиль", true, false)
  .use("/settings/edit", editProfilePage, "Редактировать профиль", true, false)
  .use(
    "/settings/password",
    editProfilePasswordPage,
    "Изменить пароль",
    true,
    false
  )
  .start();
