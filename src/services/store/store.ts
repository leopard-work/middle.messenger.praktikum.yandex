import EventBus from "../event-bus";
import { storeProps } from "../../utils/types";

const InitialState: storeProps = {
  user: {
    loginSuccess: false,
  },
};

export default class Store extends EventBus {
  static EVENT_UPDATE = "update";
  static _instance: Store;

  _state: Record<string, unknown> = {};

  constructor() {
    if (Store._instance) return Store._instance;
    super();
    this._state = InitialState;
    Store._instance = this;
  }

  getState() {
    return { ...this._state };
  }

  removeState() {
    this._state = {};
    this.emit(Store.EVENT_UPDATE);
  }

  set(id: keyof storeProps, value: unknown) {
    this._state[id] = value;
    this.emit(Store.EVENT_UPDATE);
    return this;
  }
}
