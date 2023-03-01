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
import { templatePostOwner } from "./template-post-owner";
import { postTemplate } from "./template-post";
import loadingTemplate from "../../layouts/loading";
import WS, { wsClose, wsOpen } from "../../../services/ws";
import { chatList } from "../index";
import cropMessage from "../../../utils/crop-message";

const chatMessages = new Component("div", {
  template: loadingTemplate,
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

      wsClose();

      let socket = WS;
      socket = wsOpen(user.id, chatId, token);

      let messages = "";

      const messageAdd = (item: messageTypes) => {
        if (item.user_id === user.id)
          messages += parseTemplate(templatePostOwner, {
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
        socket!.send(
          JSON.stringify({
            content: "0",
            type: "get old",
          })
        );
      });

      socket.addEventListener("message", (event) => {
        const messagesArr = JSON.parse(event.data);
        if (Array.isArray(messagesArr)) {
          messagesArr.reverse();
          messagesArr.map((item) => {
            messageAdd(item);
          });
          scrollChat();
        } else {
          if (messagesArr.type === "message") {
            messageAdd(messagesArr);
            const activeChatId = getActiveChat().id;
            (chatList.children.items as Array<Component>)
              .filter((item) => item.props.id === activeChatId)[0]
              .setProps({
                last_message: cropMessage(messagesArr.content),
                attr: { class: "nav-user nav-user_active" },
              });
            scrollChat();
          }
        }

        chatMessages.setProps({ template: messages, update: true });
      });

      const list = getChatList();
      const activeChat = list!.find((item) => item.id === chatId);
      template = chatContentActiveTpl;

      if (activeChat) {
        this.children = {
          ...this.children,
        };

        return this.compile(template, {
          ...this.props,
          title: activeChat.title,
        });
      }
    }

    return this.compile(template, { ...this.props });
  }
}

const scrollChat = () => {
  const chat_messages = document.getElementById("chat_messages");
  if (chat_messages) {
    const scroll = setInterval(() => {
      chat_messages.scrollTo({
        top: chat_messages.scrollHeight,
        behavior: "smooth",
      });
      clearInterval(scroll);
    }, 100);
  }
};

export default ChatContentClass;
