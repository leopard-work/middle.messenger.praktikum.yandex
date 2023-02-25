import { HTTPTransport } from "../../services/http-transport";
import { BASEAPIPATH } from "../index";
import { chatAddProps } from "../../utils/types";

const http = new HTTPTransport();

class apiChatService {
  add(data: chatAddProps) {
    return http.post(`${BASEAPIPATH}chats`, { data: data });
  }
}

export const apiChat = new apiChatService();
