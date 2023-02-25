import Component from "../services/component";

export type BlockProps = Record<string, any>;

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
    list: any;
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
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: Record<string, unknown>;
  time: string;
};
