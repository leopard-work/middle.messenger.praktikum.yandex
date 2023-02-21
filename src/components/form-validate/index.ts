import Component from "../../services/component";
import { Connect } from "../../services/store";
import { storeProps } from "../../utils/types";
import { getUser } from "../../services/store/actions";

class Input extends Component {}

export class FormValidate extends Connect(
  Component,
  (state: storeProps) => state.user
) {
  render() {
    const user = getUser();
    if (user.userCheck.success) {
      Object.keys(this.children).forEach((inputName) => {
        if (this.children[inputName] instanceof Input) {
          const name: string = this.children[inputName].props.attr["name"];
          const value: Record<string, unknown> = user;
          this.children[inputName].setProps({
            attr: {
              ...this.children[inputName].props.attr,
              value: value[name],
            },
          });
        }
      });
    }
    let template = "";
    if (this.props.template) template = this.props.template;
    return this.compile(template, { ...this.props });
  }
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

export const checkField = (element: unknown, value: string) => {
  if (element instanceof Input) {
    const pattern = element.props.validate["pattern"];
    const error = new Component("p", {
      template: element.props.validate["message"],
      attr: {
        class: element.props.validate["class"],
      },
    });
    const parent = element.getContent().closest("label");
    if (parent) {
      const parentElement = parent.querySelector("p");
      if (parentElement) parentElement.remove();
    }
    if (!pattern.test(value)) {
      if (parent) parent.appendChild(error.getContent());
      element.addClass("input-error");
      return false;
    }
    element.removeClass("input-error");
  }
  return true;
};

const validateInput = (event: Event, element: Input) => {
  const { target } = event;
  const value = (target as HTMLInputElement).value;
  if (event.type !== "focus") checkField(element, value);
  else if (value != "") checkField(element, value);
};

export const setInputsValidate = (
  inputs: Record<string, any>,
  tag = "input"
) => {
  Object.keys(inputs).forEach((inputName) => {
    inputs[inputName] = new Input(tag, {
      attr: inputs[inputName]["attr"],
      validate: inputs[inputName]["validate"],
      events: {
        blur: (event: Event) => validateInput(event, inputs[inputName]),
        focus: (event: Event) => validateInput(event, inputs[inputName]),
      },
    });
  });
};
