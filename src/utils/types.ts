import Component from "../services/component";

export type BlockProps = Record<string, any>;

export type setInputsValidateProps = {
  attr: Record<string, unknown>;
  validate?: Record<string, unknown>;
} & Component;

export type routeBlockClassProps = () => Component;

export type routeBlockProps = Component | null;

export type routeProps = {
  rootQuery: string;
  pageTitle?: string;
  protectNoUser?: boolean;
  protectUser?: boolean;
};

export type storeProps = {
  user: {
    userCheck: {
      request: boolean;
      success: boolean;
    };
    avatar: string | null;
    display_name: string | null;
    email: string;
    first_name: string;
    id: number;
    login: string;
    phone: string;
    second_name: string;
  };
  chat: {
    list: chatListProps[] | null;
  };
  activeChat: {
    id: number;
    token: string;
    createdBy: number;
  };
};

export type signIpProps = {
  login: string;
  password: string;
};

export type editProfileProps = {
  display_name: string;
  email: string;
  first_name: string;
  login: string;
  phone: string;
  second_name: string;
};

export type signUpProps = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  password_confirm: string;
};

export type editPasswordProps = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type chatAddProps = {
  title: string;
};

export type chatListProps = {
  created_by?: number;
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: {
    time: string;
    content: string;
    id: number;
    user: {
      avatar: string | null;
      display_name: string | null;
      email: string;
      first_name: string;
      login: string;
      phone: string;
      second_name: string;
    };
  };
  time: string;
};

export type chatToken = {
  id: number;
};

export type messageTypes = {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: string;
  content: string;
  is_read: boolean;
  file: string | null;
};

export type chatDeleteProps = {
  chatId: number;
};

export type searchUserProps = {
  login: string;
};

export type chatUserAdd = {
  users: string[];
  chatId: number;
};

export type deleteChatUserProps = {
  id: number;
  display_name: string | null;
  email: string;
  first_name: string;
  login: string;
  phone: string;
  second_name: string;
  avatar: string | null;
  role: string;
};
