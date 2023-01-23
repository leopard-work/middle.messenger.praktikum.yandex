import "reset-css";
import "./styles.scss";
import Component from "./services/component";
import render from "./utils/render";

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

const root = document.querySelector("#root");
const title = document.querySelector("title");

const pathName = window.location.pathname;

type templateProps = {
  pageTitle: string;
  content: Component;
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
    render("#root", page.content);
  }

  tempNavEvents();
  linkEvents();

  return true;
};

pageOpen(pathName);

// const frmTemplate = `{{ title }} {{ input1 }} {{ input2 }} {{ button }}`;
// const inputTemplate = `{{ value }}`;
//
// const button1 = new Component("button", {
//   template: inputTemplate,
//   value: "кнопка 1",
//   attr: {
//     disabled: "true",
//   },
//   events: {
//     click: (event: Event) => {
//       event.preventDefault();
//       alert("button1");
//       button1.setProps({
//         attr: {
//           disabled: "true",
//         },
//       });
//     },
//   },
// });
//
// const button2 = new Component("button", {
//   template: inputTemplate,
//   value: "кнопка 2",
//   events: {
//     click: (event: Event) => {
//       event.preventDefault();
//       alert("button2");
//     },
//   },
// });
//
// const page1 = new Component("div", {
//   template: frmTemplate,
//   title: "Заголовок",
//   input1: button1,
//   input2: button2,
// });
//
// page1.setProps({
//   input1: button2,
//   title: "Заголовок 2222",
//   events: {
//     click: (event: Event) => {
//       event.preventDefault();
//       alert("page1");
//     },
//   },
// });
//
// setTimeout(() => {
//   button1.setProps({
//     value: "Кнопка 1 изменена",
//     attr: {
//       disabled: "false",
//     },
//   });
//   page1.setProps({
//     title: "test",
//   });
// }, 1000);

//render("#root", page1);
