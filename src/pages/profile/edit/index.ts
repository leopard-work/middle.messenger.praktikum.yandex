import Component from "../../../services/component";
import { values } from "../index";
import { editTemplate } from "./template-edit";
import { templateForm } from "./template-form";
import validateTypes from "../../../utils/validate-types";
import {
  FormValidate,
  setInputsValidate,
} from "../../../components/form-validate";
import Link from "../../../components/link";
import ProtectedPage from "../../../components/protected-page";
import { apiUser } from "../../../api/user";
import { router } from "../../../index";
import { setUser } from "../../../services/store/actions";
import { editProfileProps, setInputsValidateProps } from "../../../utils/types";

const inputs = {
  emailBlock: {
    attr: {
      type: "email",
      name: "email",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.email,
      value: "test@mail.ru",
    },
    validate: {
      ...validateTypes.email,
      class: "auth_error",
    },
  },
  loginBlock: {
    attr: {
      type: "text",
      name: "login",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.login,
    },
    validate: {
      ...validateTypes.login,
      class: "auth_error",
    },
  },
  nameBlock: {
    attr: {
      type: "text",
      name: "first_name",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.name,
    },
    validate: {
      ...validateTypes.name,
      class: "auth_error",
    },
  },
  surnameBlock: {
    attr: {
      type: "text",
      name: "second_name",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.surname,
    },
    validate: {
      ...validateTypes.name,
      class: "auth_error",
    },
  },
  chatNameBlock: {
    attr: {
      type: "text",
      name: "display_name",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.chat_name,
    },
    validate: {
      ...validateTypes.name,
      class: "auth_error",
    },
  },
  phoneBlock: {
    attr: {
      type: "phone",
      name: "phone",
      class: "input-text auth__input-text profile__input-text",
      placeholder: values.phone,
    },
    validate: {
      ...validateTypes.phone,
      class: "auth_error",
    },
  },
};

setInputsValidate(inputs as unknown as Record<string, setInputsValidateProps>);

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
        let data: Record<string, FormDataEntryValue> = {};
        for (const pair of formValues.entries()) {
          data[pair[0]] = pair[1];
        }
        (form.children.buttonBlock as Component).setProps({
          template: "Загрузка...",
          attr: {
            disabled: "true",
          },
        });

        await apiUser.editProfile(data as editProfileProps).then((res) => {
          (form.children.buttonBlock as Component).setProps({
            template: values.passwordBtn,
            attr: {
              disabled: "false",
            },
          });
          if (res.status === 200) {
            setUser(res.response);
            router.go("/settings");
            return;
          }
          router.goToError500();
        });
      }
    },
  },
});

const editProfilePage = () => {
  return new ProtectedPage("div", {
    ...values,
    template: editTemplate,
    form: form,
  });
};

export default editProfilePage;
