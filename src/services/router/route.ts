import render from "../../utils/render";
import Component from "../component";
import {
  routeBlockClassProps,
  routeBlockProps,
  routeProps,
} from "../../utils/types";

class Route {
  _pathname: string;
  _blockClass: routeBlockClassProps;
  _block: routeBlockProps;
  _props: routeProps;

  constructor(pathname: string, view: routeBlockClassProps, props: routeProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass().content;
      render(this._props.rootQuery, this._block as Component);
      return;
    }

    this._block.show();
  }
}

export default Route;
