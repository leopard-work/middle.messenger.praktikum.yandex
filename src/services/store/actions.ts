import Store from "./store";
import { storeProps } from "../../utils/types";

const store = new Store();

const getFullState = () => {
  return store.getState();
};

const getUser = () => {
  const state = store.getState();
  return state.user;
};

const setUser = (data: Pick<storeProps, "user">) => {
  const state = store.getState();
  if (state.user) {
    const user = state.user;
    store.set("user", {
      ...user,
      ...data,
      userCheck: { ...user.userCheck, request: true, success: true },
    });
  }
};

const setUserRequest = () => {
  const state = store.getState();
  if (state.user) {
    const user = state.user;
    store.set("user", {
      ...user,
      userCheck: { ...user.userCheck, request: true, success: false },
    });
  }
};

const clearState = () => {
  store.removeState();
};

export { getFullState, setUser, setUserRequest, clearState, getUser };
