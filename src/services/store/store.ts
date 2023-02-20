import EventBus from "../event-bus";
import { storeProps } from "../../utils/types";

export const InitialState: storeProps = {
  user: {
    userCheck: {
      request: false,
      success: true,
    },
    avatar: "",
    display_name: "",
    email: "",
    first_name: "",
    id: -1,
    login: "",
    phone: "",
    second_name: "",
  },
};

export default class Store extends EventBus {
  static EVENT_UPDATE = "update";
  static _instance: Store;

  _state: storeProps = { ...InitialState };

  constructor() {
    if (Store._instance) return Store._instance;
    super();
    this._state = { ...InitialState };
    Store._instance = this;

    this.on(Store.EVENT_UPDATE, () => {
      console.log(this._state);
    });
  }

  getState(): storeProps {
    return { ...this._state };
  }

  removeState() {
    this._state = {
      ...InitialState,
      user: {
        ...InitialState.user,
        userCheck: { success: false, request: true },
      },
    };
    this.emit(Store.EVENT_UPDATE);
  }

  set(id: keyof storeProps, value: any) {
    this._state[id] = value;
    this.emit(Store.EVENT_UPDATE);
    return this;
  }
}
