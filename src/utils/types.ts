import Component from "../services/component";

export type BlockProps = Record<string, any>;

export type routeBlockClassProps = () => Component;

export type routeBlockProps = Component | null;

export type routeProps = {
  rootQuery: string;
  pageTitle?: string;
  protect?: boolean;
};
