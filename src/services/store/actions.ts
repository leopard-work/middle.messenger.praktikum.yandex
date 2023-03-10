import Store, { InitialState } from "./store";
import { storeProps } from "../../utils/types";

const store = new Store();

const getFullState = () => {
  return store.getState();
};

const getUser = () => {
  const state = store.getState();
  return state.user;
};

const getChatList = () => {
  const state = store.getState();
  return state.chat.list;
};

const getActiveChat = () => {
  const state = store.getState();
  return state.activeChat;
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

const setChatList = (data: Pick<storeProps, "chat">) => {
  const state = store.getState();
  const chat = state.chat;
  store.set("chat", {
    ...chat,
    list: data,
  });
};

const setActiveChat = (data: {
  id: number;
  token: string;
  createdBy: number;
}) => {
  const state = store.getState();
  const activeChat = state.activeChat;
  store.set("activeChat", {
    ...activeChat,
    id: data.id,
    token: data.token,
    createdBy: data.createdBy,
  });
};

const clearActiveChat = () => {
  store.set("activeChat", {
    ...InitialState.activeChat,
  });
};

const deleteActiveChat = (id: number) => {
  const state = store.getState();
  const chat = state.chat;
  const list = chat.list!.filter((item) => item.id !== id);
  store.set("chat", {
    ...chat,
    list: list,
  });
  store.set("activeChat", {
    ...InitialState.activeChat,
  });
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

export {
  getFullState,
  setUser,
  setUserRequest,
  clearState,
  getUser,
  getChatList,
  setChatList,
  setActiveChat,
  getActiveChat,
  deleteActiveChat,
  clearActiveChat,
};
