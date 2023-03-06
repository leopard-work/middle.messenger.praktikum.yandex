import Component from "../../../services/component";
import { FormValidate } from "../../../components/form-validate";
import Modal from "../../../components/modal";
import { apiChat } from "../../../api/chat";
import { getActiveChat } from "../../../services/store/actions";
import { router } from "../../../index";
import { deleteChatUserProps } from "../../../utils/types";

const chatAddUserModalTpl = `
  <h1 class="auth__title">Удалить пользователя</h1>
  <div class="modal-users">
    {{loading}}
    {{users}}
  </div>
`;

const loading = new Component("p", {
  template: "Загрузка...",
});

const usersArr: Component[] = [];
for (let i = 0; i < 10; i++) {
  usersArr.push(
    new Component("li", {
      template: `<a href="/" id="{{id}}">{{login}}</a>`,
      login: "",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          const link = event.target as HTMLElement;
          const id = link.getAttribute("id");
          if (id) {
            const chat = getActiveChat();
            if (+chat.createdBy === +id) {
              alert("Вы не можете удалить владельца чата");
              return false;
            }
            if (id && chat.id !== -1) {
              const data = {
                users: [id],
                chatId: chat.id,
              };
              apiChat
                .deleteUser(data)
                .then((res) => {
                  if (res.status !== 200) {
                    router.goToError500();
                  }
                })
                .catch(() => {
                  router.goToError500();
                });
              chatDeleteUserModal.hide();
            }
          }
        },
      },
    })
  );
}

export const chatDeleteGetUsers = () => {
  const activeChat = getActiveChat();
  apiChat.getUsers({ id: activeChat.id }).then((res) => {
    if (res.status == 200) {
      loading.hide();
      usersArr.map((item) => item.hide());
      res.response.map((item: deleteChatUserProps, i: number) => {
        usersArr[i].setProps({ login: item.login, id: item.id });
        usersArr[i].show();
      });
      users.show();
    }
  });
};

const users = new Component("ul", {
  template: "{{users}}",
  users: usersArr,
});
users.hide();

const chatModalUserDeleteForm = new FormValidate("form", {
  template: chatAddUserModalTpl,
  loading: loading,
  users: users,
});

const chatDeleteUserModal = new Modal("div", {
  children: chatModalUserDeleteForm,
});
chatDeleteUserModal.hide();

export default chatDeleteUserModal;
