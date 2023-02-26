import Component from "../../../services/component";
import { Connect } from "../../../services/store";
import { chatListProps, storeProps } from "../../../utils/types";
import loadingTemplate from "../../layouts/loading";
import { getChatList, setActiveChat } from "../../../services/store/actions";
import { chatListItemTpl } from "./template";
import dateParse from "../../../utils/date-parse";
import { apiChat } from "../../../api/chat";

class ChatListClass extends Connect(
  Component,
  (state: storeProps) => state.chat
) {
  render() {
    let template = loadingTemplate;
    const list = getChatList();

    if (list && list.length) {
      let chatListComponents: Component[] = [];
      template = "{{items}}";
      list.map((item: chatListProps) => {
        let last_message = "Сообщений пока нет...";
        let date = "";
        let unread_count = "";

        if (item.last_message) {
          last_message = item.last_message.content;
          date = dateParse(item.last_message.time);
          if (item.unread_count)
            unread_count = `<p class="nav-user__counter">${item.unread_count}</p>`;
        }

        chatListComponents.push(
          new Component("a", {
            template: chatListItemTpl,
            title: item.title,
            last_message: last_message,
            date: date,
            unread_count: unread_count,
            id: item.id,
            attr: {
              href: "/",
              class: "nav-user",
            },
            events: {
              click: (event: Event) => {
                event.preventDefault();
                event.stopPropagation();
                chatListComponents.map((item) => {
                  item.removeClass("nav-user_active");
                });
                const target = event.currentTarget as HTMLElement;
                target.classList.add("nav-user_active");
                chatListComponents.map(async (item) => {
                  if (item.hasClass("nav-user_active")) {
                    let token = {
                      token: "",
                    };
                    await apiChat
                      .getToken({ id: item.props.id })
                      .then((res) => {
                        token = res.response;
                      });
                    setActiveChat({ id: item.props.id, token: token.token });
                  }
                });
              },
            },
          })
        );
      });
      this.children = { ...this.children, items: chatListComponents };
    } else template = "";
    return this.compile(template, { ...this.props });
  }
}

export default ChatListClass;