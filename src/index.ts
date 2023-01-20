import "reset-css";
import "./styles.scss";

import homePage from "./pages/home/index";
import signInPage from "./pages/sign-in";
import signUpPage from "./pages/sign-up";
import error404Page from "./pages/error404";
import error500Page from "./pages/error500";
import { linkEvents } from "./components/link/linkEvents";
import { tempNavEvents } from "./components/tempNav/tempNavEvents";
import {
  profilePage,
  editProfilePage,
  editProfilePasswordPage,
} from "./pages/profile";
import { button, stack } from "./components/link";

const root = document.querySelector("#root");
const title = document.querySelector("title");

const pathName = window.location.pathname;

type templateProps = {
  pageTitle: string;
  content: string;
};
type pagesProps = {
  [key: string]: templateProps;
};

const pages: pagesProps = {
  "": homePage(),
  "/sign-in": signInPage(),
  "/sign-up": signUpPage(),
  "/page404": error404Page(),
  "/page500": error500Page(),
  "/profile": profilePage(),
  "/profile/edit": editProfilePage(),
  "/profile/password": editProfilePasswordPage(),
};

export const pageOpen = (pathName: string) => {
  let page = error404Page();
  if (pathName[pathName.length - 1] === "/") pathName = pathName.slice(0, -1);
  if (pages[pathName]) page = pages[pathName];

  if (title != null && root != null) {
    title.textContent = page.pageTitle;
    root.innerHTML = page.content;
    rnd("#a5", stack["a5"]);
    rnd("#a4", stack["a4"]);
    rnd("#a3", stack["a3"]);
    rnd("#a2", stack["a2"]);
  }

  tempNavEvents();
  linkEvents();

  return true;
};

pageOpen(pathName);

export function rnd(query, block) {
  const root = document.querySelector(query);
  root.replaceWith(block.getContent());
  return root;
}
