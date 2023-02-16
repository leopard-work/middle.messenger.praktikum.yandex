import Store from "./store";

const store = new Store();

const getFullState = () => {
  return store.getState();
};

const setUserAuth = (add: string) => {
  const state = store.getState();
  const user = state.user ?? {};
  store.set("user", { ...user, userName: add });
};

export { getFullState, setUserAuth };
