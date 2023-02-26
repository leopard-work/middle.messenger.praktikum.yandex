import { Connect } from "../../../services/store";
import Component from "../../../services/component";
import { storeProps } from "../../../utils/types";
import { getActiveChatId, getChatList } from "../../../services/store/actions";
import { chatContentTpl } from "./template";
import { chatContentActiveTpl } from "./template-active";

class ChatContentClass extends Connect(
  Component,
  (state: storeProps) => state.activeChat
) {
  render() {
    const chatId = getActiveChatId();
    let template = chatContentTpl;
    if (chatId !== -1) {
      const list = getChatList();
      const activeChat = list.find((item) => item.id === chatId);
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
