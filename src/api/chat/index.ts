import { HTTPTransport } from "../../services/http-transport";
import { BASE_API_PATH } from "../index";
import {
  chatAddProps,
  chatDeleteProps,
  chatToken,
  chatUserAdd,
} from "../../utils/types";

const http = new HTTPTransport();

class apiChatService {
  add(data: chatAddProps) {
    return http.post(`${BASE_API_PATH}chats`, { data: data });
  }
  get() {
    return http.get(`${BASE_API_PATH}chats`);
  }
  delete(data: chatDeleteProps) {
    return http.delete(`${BASE_API_PATH}chats`, { data: data });
  }
  getToken(data: chatToken) {
    return http.post(`${BASE_API_PATH}chats/token/${data.id}`, { data: data });
  }
  addUser(data: chatUserAdd) {
    return http.put(`${BASE_API_PATH}chats/users`, { data: data });
  }
  getUsers(data: { id: number }) {
    return http.get(`${BASE_API_PATH}chats/${data.id}/users`);
  }
  deleteUser(data: chatUserAdd) {
    return http.delete(`${BASE_API_PATH}chats/users`, { data: data });
  }
  changeAvatar(data: FormData) {
    return http.put(`${BASE_API_PATH}chats/avatar`, { data: data });
  }
}

export const apiChat = new apiChatService();
