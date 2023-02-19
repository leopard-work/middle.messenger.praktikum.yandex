import { Route } from "./index";
import { routeBlockClassProps } from "../../utils/types";

class Router {
  history!: History;
  routes!: Route[];
  _currentRoute: Route | null | undefined;
  _rootQuery!: string;
  _error404Page!: routeBlockClassProps;
  _error500Path!: string;

  private static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(
    pathname: string,
    block: routeBlockClassProps,
    pageTitle: string,
    protect?: boolean
  ) {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery,
      pageTitle: pageTitle,
      protect: protect,
    });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      type targetProps = EventTarget & { location: Location };
      const target: targetProps = event.currentTarget as targetProps;
      if (target) this._onRoute(target.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    if (pathname[pathname.length - 1] === "/") pathname = pathname.slice(0, -1);
    let route = this.getRoute(pathname);

    const title = document.querySelector("title");

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    if (!route && this._error404Page)
      route = new Route(pathname, this._error404Page, {
        rootQuery: this._rootQuery,
      });

    if (route) {
      this._currentRoute = route;
      if (title)
        title.textContent = this._currentRoute._props.pageTitle as string;
      route.render();
    }
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    const pathname =
      this.routes[this.routes.lastIndexOf(this._currentRoute as Route) - 1]
        ._pathname;
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  forward() {
    const pathname =
      this.routes[this.routes.lastIndexOf(this._currentRoute as Route) + 1]
        ._pathname;
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  setError404Page(block: routeBlockClassProps) {
    this._error404Page = block;
    return;
  }

  setError500Path(path: string) {
    this._error500Path = path;
    return;
  }

  goToError500() {
    this.go(this._error500Path);
  }
}

export default Router;
