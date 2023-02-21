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
};
