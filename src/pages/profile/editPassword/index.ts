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
import { apiUser } from "../../../api/user";
import { router } from "../../../index";
import { editPasswordProps } from "../../../utils/types";

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
    submit: async (event: Event) => {
      event.preventDefault();
      if (form.checkFields()) {
        const formValues = new FormData(form.getContent() as HTMLFormElement);
        const data: Record<string, FormDataEntryValue> = {};
        for (const pair of formValues.entries()) {
          data[pair[0]] = pair[1];
        }
        (form.children.buttonBlock as Component).setProps({
          passwordBtn: "Загрузка...",
          attr: {
            disabled: "true",
          },
        });

        await apiUser.editPassword(data as editPasswordProps).then((res) => {
          (form.children.buttonBlock as Component).setProps({
            passwordBtn: values.passwordBtn,
            attr: {
              disabled: "false",
            },
          });

          if (res.status === 200) {
            (form.getContent() as HTMLFormElement).reset();
            form.setProps({ error: "" });
            router.go("/settings");
            return;
          }
          if (res.response.reason === "Password is incorrect") {
            form.setProps({ error: "Старый пароль неверный" });
            return;
          }
          router.goToError500();
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
