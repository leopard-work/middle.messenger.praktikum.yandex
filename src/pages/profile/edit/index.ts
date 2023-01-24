import Component from "../../../services/component";
import { values } from "../index";
import { editTemplate } from "./template_edit";

const editProfilePage = () => {
  const content = new Component("div", { ...values, template: editTemplate });
  return { pageTitle: values.pageTitleEdit, content: content };
};

export default editProfilePage;
