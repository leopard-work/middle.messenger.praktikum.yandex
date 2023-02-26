import Component from "../../../services/component";
import { Connect } from "../../../services/store";
import { chatListProps, storeProps } from "../../../utils/types";
import loadingTemplate from "../../layouts/loading";
import { getChatList, setActiveChat } from "../../../services/store/actions";
import { chatListItemTpl } from "./template";
import dateParse from "../../../utils/date-parse";

class ChatListClass extends Connect(
  Component,
  (state: storeProps) => state.chat
) {
  render() {
    let template = loadingTemplate;
    const list = getChatList();

    if (list.length) {
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
                chatListComponents.map((item) => {
                  if (item.hasClass("nav-user_active")) {
                    setActiveChat(item.props.id);
                  }
                });
              },
            },
          })
        );
      });
      this.children = { ...this.children, items: chatListComponents };
    }
    return this.compile(template, { ...this.props });
  }
}

export default ChatListClass;
