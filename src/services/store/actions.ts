import Store from "./store";

const store = new Store();

const getCustomState = () => {
  return store.getState();
};

const addCustomData = (add: string) => {
  store.set("test", add);
};

export { getCustomState, addCustomData };
