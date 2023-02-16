import Component from "../../services/component";
import { Connect } from "../../services/store";
import { storeProps } from "../../utils/types";

class Input extends Component {}

export class FormValidate extends Connect(
  Component,
  (state: storeProps) => state.user.userCheck
) {
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
