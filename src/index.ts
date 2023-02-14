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

// const root = document.querySelector("#root");
// const title = document.querySelector("title");
//
// const pathName = window.location.pathname;

// type templateProps = {
//   pageTitle: string;
//   content: Component;
// };
// type pagesProps = {
//   [key: string]: templateProps;
// };

// const pages: pagesProps = {
//   "": homePage(),
//   "/sign-in": signInPage(),
//   "/sign-up": signUpPage(),
//   "/page404": error404Page(),
//   "/page500": error500Page(),
//   "/profile": profilePage(),
//   "/profile/edit": editProfilePage(),
//   "/profile/password": editProfilePasswordPage(),
// };
//
// export const pageOpen = (pathName: string) => {
//   let page = error404Page();
//   if (pathName[pathName.length - 1] === "/") pathName = pathName.slice(0, -1);
//   if (pages[pathName]) page = pages[pathName];
//
//   if (title != null && root != null) {
//     title.textContent = page.pageTitle;
//     render("#root", page.content);
//   }
//
//   return true;
// };
//
// pageOpen(pathName);

export const router = new Router("#root");

router
  .use("/", homePage)
  .use("/sign-in", signInPage)
  .use("/sign-up", signUpPage)
  .use("/page404", error404Page)
  .use("/page500", error500Page)
  .use("/settings", profilePage)
  .use("/settings/edit", editProfilePage)
  .use("/settings/password", editProfilePasswordPage)
  .start();

console.log(router);
