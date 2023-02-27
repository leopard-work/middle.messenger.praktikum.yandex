import { HTTPTransport } from "../../services/http-transport";
import { BASEAPIPATH } from "../index";
import { chatAddProps, chatDeleteProps, chatToken } from "../../utils/types";

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
}

export const apiChat = new apiChatService();
