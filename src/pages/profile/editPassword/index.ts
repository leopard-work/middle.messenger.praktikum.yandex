import Component from "../../../services/component";
import { values } from "../index";
import { editPasswordTemplate } from "./template-edit-password";
import validateTypes from "../../../utils/validate-types";
import {
  FormValidate,
  setInputsValidate,
} from "../../../components/form-validate";
import { templateForm } from "./template-form";
import tempNav from "../../../components/temp-nav";
import Link from "../../../components/link";

const inputs = {
  oldPasswordBlock: {
    attr: {
      type: "password",
      name: "oldPassword",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.oldPassword,
    },
    validate: {
      ...validateTypes.password,
      class: "auth_error",
    },
  },
  newPasswordBlock: {
    attr: {
      type: "password",
      name: "newPassword",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.newPassword,
    },
    validate: {
      ...validateTypes.password,
      class: "auth_error",
    },
  },
  confirmPasswordBlock: {
    attr: {
      type: "password",
      name: "confirmPassword",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.confirmPassword,
    },
    validate: {
      ...validateTypes.password,
      class: "auth_error",
    },
  },
};

setInputsValidate(inputs);

const formButton = new Component("button", {
  ...values,
  template: "{{ passwordBtn }}",
  attr: {
    type: "submit",
    class: "input-button auth__button profile__button",
  },
});

const form = new FormValidate("form", {
  backLink: Link({
    children: values.back,
    href: "/settings",
    class: "profile__back",
  }),
  ...values,
  ...inputs,
  buttonBlock: formButton,
  template: templateForm,
  attr: {
    class: "auth profile",
  },
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      if (form.checkFields()) {
        const values = new FormData(form.getContent() as HTMLFormElement);
        const data: Record<string, FormDataEntryValue> = {};
        for (const pair of values.entries()) {
          data[pair[0]] = pair[1];
        }
        console.log(data);
        (form.getContent() as HTMLFormElement).reset();
        form.children.buttonBlock.setProps({
          passwordBtn: "Отправлено",
          attr: {
            disabled: "true",
          },
        });
      }
    },
  },
});

const editProfilePasswordPage = () => {
  return new Component("div", {
    tempNav: tempNav(),
    ...values,
    template: editPasswordTemplate,
    form: form,
  });
};

export default editProfilePasswordPage;
