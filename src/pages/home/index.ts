import { template } from "./template";
import "./styles.scss";
import Link from "../../components/link";
import {
  FormValidate,
  setInputsValidate,
} from "../../components/form-validate";
import validateTypes from "../../utils/validate-types";
import { templateForm } from "./template-form";
import ProtectedPage from "../../components/protected-page";
import chatAddModal from "./chat-add-modal";
import {
  deleteActiveChat,
  getActiveChat,
  getChatList,
  setChatList,
} from "../../services/store/actions";
import { apiChat } from "../../api/chat";
import ChatListClass from "./chat-list";
import ChatContentClass from "./chat-content";
import chatInfoModal from "./chat-info-modal";
import { wsClose, wsSend } from "../../services/ws";
import { router } from "../../index";
import Component from "../../services/component";
import cropMessage from "../../utils/crop-message";
import chatAddUserModal from "./chat-add-user-modal";
import Modal from "../../components/modal";
import chatDeleteUserModal from "./chat-delete-user-modal";
import {
  chatListProps,
  setInputsValidateProps,
  storeProps,
} from "../../utils/types";
import { Connect } from "../../services/store";
import { BASE_API_PATH } from "../../api";

const profileBtnIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"><path d="M 22.205078 2 A 1.0001 1.0001 0 0 0 21.21875 2.8378906 L 20.246094 8.7929688 C 19.076509 9.1331971 17.961243 9.5922728 16.910156 10.164062 L 11.996094 6.6542969 A 1.0001 1.0001 0 0 0 10.708984 6.7597656 L 6.8183594 10.646484 A 1.0001 1.0001 0 0 0 6.7070312 11.927734 L 10.164062 16.873047 C 9.583454 17.930271 9.1142098 19.051824 8.765625 20.232422 L 2.8359375 21.21875 A 1.0001 1.0001 0 0 0 2.0019531 22.205078 L 2.0019531 27.705078 A 1.0001 1.0001 0 0 0 2.8261719 28.691406 L 8.7597656 29.742188 C 9.1064607 30.920739 9.5727226 32.043065 10.154297 33.101562 L 6.6542969 37.998047 A 1.0001 1.0001 0 0 0 6.7597656 39.285156 L 10.648438 43.175781 A 1.0001 1.0001 0 0 0 11.927734 43.289062 L 16.882812 39.820312 C 17.936999 40.39548 19.054994 40.857928 20.228516 41.201172 L 21.21875 47.164062 A 1.0001 1.0001 0 0 0 22.205078 48 L 27.705078 48 A 1.0001 1.0001 0 0 0 28.691406 47.173828 L 29.751953 41.1875 C 30.920633 40.838997 32.033372 40.369697 33.082031 39.791016 L 38.070312 43.291016 A 1.0001 1.0001 0 0 0 39.351562 43.179688 L 43.240234 39.287109 A 1.0001 1.0001 0 0 0 43.34375 37.996094 L 39.787109 33.058594 C 40.355783 32.014958 40.813915 30.908875 41.154297 29.748047 L 47.171875 28.693359 A 1.0001 1.0001 0 0 0 47.998047 27.707031 L 47.998047 22.207031 A 1.0001 1.0001 0 0 0 47.160156 21.220703 L 41.152344 20.238281 C 40.80968 19.078827 40.350281 17.974723 39.78125 16.931641 L 43.289062 11.933594 A 1.0001 1.0001 0 0 0 43.177734 10.652344 L 39.287109 6.7636719 A 1.0001 1.0001 0 0 0 37.996094 6.6601562 L 33.072266 10.201172 C 32.023186 9.6248101 30.909713 9.1579916 29.738281 8.8125 L 28.691406 2.828125 A 1.0001 1.0001 0 0 0 27.705078 2 L 22.205078 2 z M 23.056641 4 L 26.865234 4 L 27.861328 9.6855469 A 1.0001 1.0001 0 0 0 28.603516 10.484375 C 30.066026 10.848832 31.439607 11.426549 32.693359 12.185547 A 1.0001 1.0001 0 0 0 33.794922 12.142578 L 38.474609 8.7792969 L 41.167969 11.472656 L 37.835938 16.220703 A 1.0001 1.0001 0 0 0 37.796875 17.310547 C 38.548366 18.561471 39.118333 19.926379 39.482422 21.380859 A 1.0001 1.0001 0 0 0 40.291016 22.125 L 45.998047 23.058594 L 45.998047 26.867188 L 40.279297 27.871094 A 1.0001 1.0001 0 0 0 39.482422 28.617188 C 39.122545 30.069817 38.552234 31.434687 37.800781 32.685547 A 1.0001 1.0001 0 0 0 37.845703 33.785156 L 41.224609 38.474609 L 38.53125 41.169922 L 33.791016 37.84375 A 1.0001 1.0001 0 0 0 32.697266 37.808594 C 31.44975 38.567585 30.074755 39.148028 28.617188 39.517578 A 1.0001 1.0001 0 0 0 27.876953 40.3125 L 26.867188 46 L 23.052734 46 L 22.111328 40.337891 A 1.0001 1.0001 0 0 0 21.365234 39.53125 C 19.90185 39.170557 18.522094 38.59371 17.259766 37.835938 A 1.0001 1.0001 0 0 0 16.171875 37.875 L 11.46875 41.169922 L 8.7734375 38.470703 L 12.097656 33.824219 A 1.0001 1.0001 0 0 0 12.138672 32.724609 C 11.372652 31.458855 10.793319 30.079213 10.427734 28.609375 A 1.0001 1.0001 0 0 0 9.6328125 27.867188 L 4.0019531 26.867188 L 4.0019531 23.052734 L 9.6289062 22.117188 A 1.0001 1.0001 0 0 0 10.435547 21.373047 C 10.804273 19.898143 11.383325 18.518729 12.146484 17.255859 A 1.0001 1.0001 0 0 0 12.111328 16.164062 L 8.8261719 11.46875 L 11.523438 8.7734375 L 16.185547 12.105469 A 1.0001 1.0001 0 0 0 17.28125 12.148438 C 18.536908 11.394293 19.919867 10.822081 21.384766 10.462891 A 1.0001 1.0001 0 0 0 22.132812 9.6523438 L 23.056641 4 z M 25 17 C 20.593567 17 17 20.593567 17 25 C 17 29.406433 20.593567 33 25 33 C 29.406433 33 33 29.406433 33 25 C 33 20.593567 29.406433 17 25 17 z M 25 19 C 28.325553 19 31 21.674447 31 25 C 31 28.325553 28.325553 31 25 31 C 21.674447 31 19 28.325553 19 25 C 19 21.674447 21.674447 19 25 19 z"></path></svg>';

const values = {
  template: template,
  search_placeholder: "??????????...",
  message_placeholder: "??????????????????...",
  chatAddText: "???????????????? ?????? ?????? ???????????????? ??????????",
  chatAddBtnText: "???????????????? ??????",
};

const inputs = {
  messageBlock: {
    attr: {
      name: "message",
      class: "chat-write__textarea",
      placeholder: values.message_placeholder,
    },
    validate: {
      ...validateTypes.empty,
      class: "auth_error",
    },
  },
};

setInputsValidate(
  inputs as unknown as Record<string, setInputsValidateProps>,
  "textarea"
);

export const messagesForm = new FormValidate("form", {
  ...values,
  ...inputs,
  attr: {
    class: "chat-write",
  },
  template: templateForm,
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      if (messagesForm.checkFields()) {
        const values = new FormData(
          messagesForm.getContent() as HTMLFormElement
        );
        const data: Record<string, FormDataEntryValue> = {};
        for (const pair of values.entries()) {
          data[pair[0]] = pair[1];
        }
        if (data.message) {
          data.message = (data.message as string).replace(
            /(?:\r\n|\r|\n)/g,
            "<br/>"
          );
          const arr = data.message.split("<br/>");
          data.message = "";
          arr.map((item, i) => {
            if (i) {
              if (arr[i - 1]) data.message += "<br/>";
            }
            data.message += item;
          });

          wsSend(data.message);

          data.message = cropMessage(data.message);
          const activeChatId = getActiveChat().id;
          (chatList.children.items as Array<Component>)
            .filter((item) => item.props.id === activeChatId)[0]
            .setProps({
              last_message: data.message,
              attr: { class: "nav-user nav-user_active" },
            });
        }
        (messagesForm.getContent() as HTMLFormElement).reset();
      }
    },
  },
});

export const chatList = new ChatListClass("div", {});

class ChatAvatarClass extends Connect(Component, (state: storeProps) => state) {
  render() {
    const activeChat = getActiveChat();
    const list = getChatList();
    if (list) {
      const chat = list!.filter((item) => item.id === activeChat.id);
      if (chat[0]) {
        this.props.avatar = chat[0].avatar;
      }
    }
    let template = "<div></div>";
    if (this.props.avatar) {
      template = `<div><img src="${BASE_API_PATH}resources{{avatar}}" alt=""></div>`;
    }
    return this.compile(template, { ...this.props });
  }
}

const avatarBlock = new ChatAvatarClass("div", {});

const chatContent = new ChatContentClass("div", {
  attr: {
    class: "chat__content",
  },
  chatInfoBtn: Link({
    href: "/",
    class: "chat-info__btn",
    onClick: () => {
      chatInfoModal.show();
    },
    children: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="408px" height="408px" viewBox="0 0 408 408" style="enable-background:new 0 0 408 408;" xml:space="preserve"><g id="more-vert"><path d="M204,102c28.05,0,51-22.95,51-51S232.05,0,204,0s-51,22.95-51,51S175.95,102,204,102z M204,153c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S232.05,153,204,153z M204,306c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S232.05,306,204,306z"/></g></svg>`,
  }),
  chatAddText: values.chatAddText,
  chatAddBtn: Link({
    children: values.chatAddBtnText,
    href: "/",
    onClick: () => {
      chatAddModal.show();
    },
  }),
  form: messagesForm,
  avatar: avatarBlock,
});

export const chatDelete = () => {
  const chat = getActiveChat();
  if (chat.id) {
    wsClose();
    apiChat
      .delete({ chatId: chat.id })
      .then((res) => {
        if (res.status === 200) {
          deleteActiveChat(chat.id);
        } else {
          if (res.response.reason === "Action is not permitted") {
            errorModal.setProps({
              children: "<p>???? ???? ?????????????????? ???????????????????? ?????????? ????????</p>",
            });
            errorModal.show();
          }
        }
      })
      .catch(() => {
        router.goToError500();
      });
    chatList.render();
  }
};

export const avatarInput = new Component("input", {
  attr: { name: "avatar", type: "file" },
  events: {
    change: async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const image = target!.files?.item(0);
      if (!image) return;
      const formData = new FormData();
      formData.append("avatar", image);
      const activeChat = getActiveChat();
      formData.append("chatId", activeChat.id as unknown as string);
      await apiChat
        .changeAvatar(formData)
        .then(async (res) => {
          if (res.status === 200) {
            await apiChat.get().then((res) => {
              setChatList(res.response);
            });
            return;
          }
          alert("???????????? ???? ?????????????????????????? ?????????????? ?????? ?????????????? ??????????????");
        })
        .catch(() => {
          alert("???????????? ???? ?????????????????????????? ?????????????? ?????? ?????????????? ??????????????");
        });
    },
  },
});
avatarInput.hide();

export const errorModal = new Modal("div", {
  children: "",
});
errorModal.hide();

const search = new Component("input", {
  attr: {
    type: "text",
    class: "input-text",
    placeholder: values.search_placeholder,
  },
  events: {
    keyup: (event: Event) => {
      const target = event.target;
      const value = (target as HTMLFormElement).value;
      chatList.props.list.map((item: chatListProps, i: number) => {
        (chatList.children.items as Array<Component>)[i].hide();
        if (item.title.indexOf(value) === 0) {
          console.log(item);
          (chatList.children.items as Array<Component>)[i].showFlex();
        }
      });
    },
  },
});

const homePage = () => {
  apiChat.get().then((res) => {
    setChatList(res.response);
  });

  return new ProtectedPage("div", {
    ...values,
    profileLink: Link({
      children: profileBtnIcon,
      href: "/settings",
      class: "nav-info__profile-btn",
    }),
    chatList: chatList,
    content: chatContent,
    chatAddModal: chatAddModal,
    chatInfoModal: chatInfoModal,
    chatAddUserModal: chatAddUserModal,
    errorModal: errorModal,
    chatDeleteUserModal: chatDeleteUserModal,
    avatarInput: avatarInput,
    search: search,
  });
};

export default homePage;
