import Store from "./store";

const store = new Store();

const getFullState = () => {
  return store.getState();
};

const setUserCheck = (add: boolean) => {
  const state = store.getState();
  if (state.user) {
    const user = state.user;
    store.set("user", {
      ...user,
      userCheck: { ...user.userCheck, request: add },
    });
  }
};

export { getFullState, setUserCheck };
