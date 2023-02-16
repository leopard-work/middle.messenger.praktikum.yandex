import EventBus from "./event-bus";
import { v4 as uuid } from "uuid";
import parseTemplate from "./parse-template";
import isEqual from "../utils/is-equal";
import { BlockProps } from "../utils/types";

abstract class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  _element: Element | null = null;
  _meta: { tagName: string | null; props: BlockProps } | null = null;
  _id: string = uuid();
  eventBus: () => EventBus;
  props: BlockProps;
  children: Record<string, Block>;
  id: string | undefined;

  constructor(tagName: string | null = "div", propsAndChilds: BlockProps) {
    const { children, props } = this._getChildren(propsAndChilds);
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };
    this.eventBus = () => eventBus;
    this.children = children;
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  get element() {
    return this._element;
  }

  _getChildren(propsAndChildren: BlockProps) {
    const children: Record<string, Block> = {};
    const props: BlockProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _makePropsProxy(props: BlockProps) {
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target: BlockProps, prop: string, value: unknown) => {
        const oldProps = target[prop];
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target[prop]);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    element.setAttribute("data-id", this._id);
    return element;
  }

  _createResources() {
    if (this._meta && this._meta.tagName != null)
      this._element = this._createDocumentElement(this._meta.tagName);
  }

  _componentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this.componentDidMount();
  }

  _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element)
        this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element)
        this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _setAttributes() {
    if (this.props["attr"]) {
      Object.entries(this.props["attr"]).forEach(([key, value]) => {
        if (typeof value === "string" && this._element != null) {
          if (value != "false") this._element.setAttribute(key, value);
          else this._element.removeAttribute(key);
        }
      });
    }
  }

  _render() {
    const block = this.render() as unknown as HTMLTemplateElement;
    this._removeEvents();
    if (this._element != null) {
      this._element.innerHTML = "";
      this._element.appendChild(block);
      this._setAttributes();
      this._addEvents();
    }
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount() {
    return;
  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    //return !isEqual(oldProps, newProps);
    return true;
  }

  getContent(): HTMLElement {
    return <HTMLElement>this.element;
  }

  render() {
    return;
  }

  setProps = (nextProps: BlockProps) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }

  addClass(className: string) {
    this.getContent().classList.add(className);
  }

  removeClass(className: string) {
    this.getContent().classList.remove(className);
  }

  compile(template: string, props?: BlockProps) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;
    fragment.innerHTML = parseTemplate(template, { ...propsAndStubs });

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector<HTMLInputElement>(
        `[data-id=${child.id}]`
      );
      if (stub) (stub as HTMLElement).replaceWith(child.getContent());
    });

    return fragment.content;
  }
}

class Component extends Block {
  render() {
    let template = "";
    if (this.props.template) template = this.props.template;
    return this.compile(template, { ...this.props });
  }
}

export default Component;
