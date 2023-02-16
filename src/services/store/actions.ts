import Store from "./store";

const store = new Store();

const getCustomState = () => {
  return store.getState();
};

const addCustomData = (add: any) => {
  store.set("user", add);
};

const addCustomData2 = (add: any) => {
  store.set("button", add);
};

export { getCustomState, addCustomData, addCustomData2 };
