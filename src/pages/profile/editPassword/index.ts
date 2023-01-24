import Component from "../../../services/component";
import { values } from "../index";
import { editPasswordTemplate } from "./template_edit_password";

const editProfilePasswordPage = () => {
  const content = new Component("div", {
    ...values,
    template: editPasswordTemplate,
  });
  return { pageTitle: values.pageTitleEditPassword, content: content };
};

export default editProfilePasswordPage;
