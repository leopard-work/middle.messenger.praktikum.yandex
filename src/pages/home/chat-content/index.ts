import { Connect } from "../../../services/store";
import Component from "../../../services/component";
import { messageTypes, storeProps } from "../../../utils/types";
import {
  getActiveChat,
  getChatList,
  getUser,
} from "../../../services/store/actions";
import { chatContentTpl } from "./template";
import { chatContentActiveTpl } from "./template-active";
import parseTemplate from "../../../services/parse-template";
import dateParse from "../../../utils/date-parse";
import { postTemplateOwner } from "./post-template-owner";
import { postTemplate } from "./template-post";

const chatMessages = new Component("div", {
  template: "Пусто",
});

class ChatContentClass extends Connect(
  Component,
  (state: storeProps) => state.activeChat
) {
  render() {
    const chat = getActiveChat();
    const chatId = chat.id;
    let template = chatContentTpl;

    if (chatId !== -1) {
      this.children = {
        messages: chatMessages,
        ...this.children,
      };

      const user = getUser();
      const token = chat.token;

      const socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${token}`
      );

      let messages = "";

      const messageAdd = (item: messageTypes) => {
        if (item.user_id === user.id)
          messages += parseTemplate(postTemplateOwner, {
            content: item.content,
            date: dateParse(item.time),
          });
        else
          messages += parseTemplate(postTemplate, {
            content: item.content,
            date: dateParse(item.time),
          });
      };

      socket.addEventListener("open", () => {
        socket.send(
          JSON.stringify({
            content: "0",
            type: "get old",
          })
        );
      });

      socket.addEventListener("close", (event) => {
        if (event.wasClean) {
          console.log("Соединение закрыто чисто");
        } else {
          console.log("Обрыв соединения");
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });

      socket.addEventListener("message", (event) => {
        const messagesArr = JSON.parse(event.data);
        if (Array.isArray(messagesArr)) {
          messagesArr.reverse();
          messagesArr.map((item) => {
            messageAdd(item);
          });
        } else {
          messageAdd(messagesArr);
        }

        chatMessages.setProps({ template: messages, update: true });
      });

      socket.addEventListener("error", () => {
        //console.log("Ошибка");
      });

      const list = getChatList();
      const activeChat = list!.find((item) => item.id === chatId);
      template = chatContentActiveTpl;
      const btn = this.children.chatAddBtn as Component;
      btn.hide();
      if (activeChat)
        return this.compile(template, {
          ...this.props,
          title: activeChat.title,
        });
    }

    return this.compile(template, { ...this.props });
  }
}

export default ChatContentClass;
