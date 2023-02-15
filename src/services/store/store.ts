import EventBus from "../event-bus";

export default class Store extends EventBus {
  static EVENT_UPDATE = "update";
  static _instance: Store;

  _state = {};

  constructor() {
    if (Store._instance) return Store._instance;

    super();

    //this._state = {};

    Store._instance = this;

    this.on(Store.EVENT_UPDATE, () => {
      console.log(this._state);
    });
  }

  getState() {
    return this._state;
  }

  removeState() {
    this._state = {};
    this.emit(Store.EVENT_UPDATE);
  }

  set(id, value) {
    this._state[id] = value;
    this.emit(Store.EVENT_UPDATE);
    return this;
  }
}
