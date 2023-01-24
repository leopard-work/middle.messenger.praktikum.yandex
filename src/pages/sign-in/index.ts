import { template } from "./template";
import "../profile/styles.scss";
import Component from "../../services/component";

const form_template = `
        <h1 class="auth__title">{{ title }}</h1>
        <label class="auth__input-text-wrapper">
            {{ loginBlock }}
        </label>
        <label class="auth__input-text-wrapper">
            {{ passwordBlock }}
        </label>
        <div class="auth__button-wrapper">
            {{ buttonBlock }}
        </div>
        <div class="auth__link">
            [[ link? &href='/sign-up' &title='{{ reg_link }}' ]]
        </div>
    `;

const values = {
  pageTitle: "Авторизация",
  title: "Авторизация",
  login: "Логин",
  password: "Пароль",
  button: "Вход",
  reg_link: "Ещё не зарегистрированы?",
  error: "Ошибка ошибка ошибка",
};

const validateTypes = {
  empty: {
    pattern: /\S+/,
    message: "Поле не должно быть пустым",
  },
};

const inputs: Record<string, any> = {
  loginBlock: {
    attr: {
      type: "text",
      name: "login",
      class: "input-text auth__input-text",
      placeholder: values.login,
    },
    validate: {
      ...validateTypes.empty,
      class: "auth_error",
    },
  },
  passwordBlock: {
    attr: {
      type: "password",
      name: "password",
      class: "input-text auth__input-text",
      placeholder: "Пароль",
    },
    validate: {
      ...validateTypes.empty,
      class: "auth_error",
    },
  },
};

class Input extends Component {}

const checkField = (element: unknown, value: string) => {
  if (element instanceof Input) {
    const pattern = element.props.validate["pattern"];
    const error = new Component("p", {
      template: element.props.validate["message"],
      attr: {
        class: element.props.validate["class"],
      },
    });
    const parent = element.getContent().closest("label");
    const parentElement = parent!.querySelector("p");
    if (parentElement) parentElement!.remove();
    if (!pattern.test(value)) {
      if (parent) parent.appendChild(error.getContent());
      return false;
    }
  }

  return true;
};

Object.keys(inputs).forEach((inputName) => {
  inputs[inputName] = new Input("input", {
    attr: inputs[inputName]["attr"],
    validate: inputs[inputName]["validate"],
    events: {
      blur: (event: Event) => {
        const { target } = event;
        const value = (target as HTMLInputElement).value;
        checkField(inputs[inputName], value);
      },
      focus: (event: Event) => {
        const { target } = event;
        const value = (target as HTMLInputElement).value;
        if (value != "") checkField(inputs[inputName], value);
      },
    },
  });
});

class FormValidate extends Component {
  checkFields() {
    let ok = true;
    Object.keys(this.children).forEach((input) => {
      const value = (this.children[input].getContent() as HTMLInputElement)
        .value;
      if (!checkField(this.children[input], value)) ok = false;
    });
    return ok;
  }
}

const button = new Component("button", {
  ...values,
  template: "{{ button }}",
  attr: {
    type: "submit",
    class: "input-button auth__button",
  },
});

const form = new FormValidate("form", {
  ...values,
  ...inputs,
  buttonBlock: button,
  template: form_template,
  attr: {
    class: "auth",
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
        form.children.buttonBlock.setProps({
          button: "Отправлено",
          attr: {
            disabled: "true",
          },
        });
      }
    },
  },
});

const signInPage = () => {
  const content = new Component("div", {
    ...values,
    template: template,
    form: form,
  });
  return { pageTitle: values.pageTitle, content: content };
};

export default signInPage;
