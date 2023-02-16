import { Connect } from "../../services/store";
import Component from "../../services/component";
import { storeProps } from "../../utils/types";

class ProtectedPage extends Connect(
  Component,
  (state: storeProps) => state.user.userCheck
) {
  render() {
    let template = "loading...";
    if (this.props.template && this.props.request)
      template = this.props.template;
    return this.compile(template, { ...this.props });
  }
}

export default ProtectedPage;
