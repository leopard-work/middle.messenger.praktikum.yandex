import { HTTPTransport } from "../../services/http-transport";
import { BASEAPIPATH } from "../index";
import { chatAddProps, chatToken } from "../../utils/types";

const http = new HTTPTransport();

class apiChatService {
  add(data: chatAddProps) {
    return http.post(`${BASEAPIPATH}chats`, { data: data });
  }
  get() {
    return http.get(`${BASEAPIPATH}chats`);
  }
  getToken(data: chatToken) {
    return http.post(`${BASEAPIPATH}chats/token/${data.id}`, { data: data });
  }
}

export const apiChat = new apiChatService();
