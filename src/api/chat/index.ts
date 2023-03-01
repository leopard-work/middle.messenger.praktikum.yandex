import { HTTPTransport } from "../../services/http-transport";
import { BASEAPIPATH } from "../index";
import {
  chatAddProps,
  chatDeleteProps,
  chatToken,
  chatUserAdd,
} from "../../utils/types";

const http = new HTTPTransport();

class apiChatService {
  add(data: chatAddProps) {
    return http.post(`${BASEAPIPATH}chats`, { data: data });
  }
  get() {
    return http.get(`${BASEAPIPATH}chats`);
  }
  delete(data: chatDeleteProps) {
    return http.delete(`${BASEAPIPATH}chats`, { data: data });
  }
  getToken(data: chatToken) {
    return http.post(`${BASEAPIPATH}chats/token/${data.id}`, { data: data });
  }
  addUser(data: chatUserAdd) {
    return http.put(`${BASEAPIPATH}chats/users`, { data: data });
  }
  getUsers(data: { id: number }) {
    return http.get(`${BASEAPIPATH}chats/${data.id}/users`);
  }
  deleteUser(data: chatUserAdd) {
    return http.delete(`${BASEAPIPATH}chats/users`, { data: data });
  }
  changeAvatar(data: FormData) {
    return http.put(`${BASEAPIPATH}chats/avatar`, { data: data });
  }
}

export const apiChat = new apiChatService();
