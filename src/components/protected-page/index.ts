import { Connect } from "../../services/store";
import Component from "../../services/component";
import { storeProps } from "../../utils/types";
import { apiUser } from "../../api/user";
import { setUser, setUserRequest } from "../../services/store/actions";
import { router } from "../../index";
import loadingTemplate from "../../pages/layouts/loading";

class ProtectedPage extends Connect(
  Component,
  (state: storeProps) => state.user.userCheck
) {
  render() {
    let template = loadingTemplate;
    if (!this.props.request) {
      apiUser.userInfo().then((res) => {
        if (res.status === 200) setUser(res.response);
        else setUserRequest();
      });
    }
    if (this.props.template && this.props.success && this.props.request)
      template = this.props.template;
    if (!this.props.success && this.props.request) {
      router.go("/sign-in");
    }
    return this.compile(template, { ...this.props });
  }
}

export default ProtectedPage;
