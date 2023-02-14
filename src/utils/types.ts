import Component from "../services/component";

export type BlockProps = Record<string, any>;
export type routeBlockClassProps = () => { content: Component };
export type routeBlockProps = Component | null;
export type routeProps = { rootQuery: string };
