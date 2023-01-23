import EventBus from "./event-bus";
import parseTemplate from "../components/parse-template";

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element = null;
  _meta = null;
  _id = null;
  eventBus: () => EventBus;
  props: { [key: string]: any } | undefined;
  children: any;

  constructor(tagName = "div", propsAndChilds = {}) {
    const { children, props } = this._getChildren(propsAndChilds);
    const eventBus = new EventBus();
    // @ts-ignore
    this._meta = {
      tagName,
      props,
    };
    this.eventBus = () => eventBus;
    this.children = children;
    this.props = this._makePropsProxy(props);
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  get element() {
    return this._element;
  }

  _getChildren(propsAndChildren: any) {
    const children: any = {};
    const props: any = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _makePropsProxy(props: any) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: any) {
    return document.createElement(tagName);
  }

  _createResources() {
    const { tagName }: any = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _componentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this.componentDidMount();
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  _addEvents() {
    // @ts-ignore
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      // @ts-ignore
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _render() {
    const block = this.render();
    // this._removeEvents();
    // @ts-ignore
    this._element.innerHTML = "";
    // @ts-ignore
    this._element.appendChild(block);
    this._addEvents();
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

  componentDidMount() {}

  //@ts-ignore
  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  getContent() {
    return this.element;
  }

  render() {}

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }
    // @ts-ignore
    Object.assign(this.props, nextProps);
  };

  compile(template: any, props?: any) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]: any) => {
      propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
    });

    const fragment = this._createDocumentElement("template");
    fragment.innerHTML = parseTemplate(template, { ...propsAndStubs });

    Object.values(this.children).forEach((child: any) => {
      const stub = fragment.content.querySelector(`[data-id=${child.id}]`);
      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }
}

class Component extends Block {
  render() {
    // @ts-ignore
    return this.compile(this.props.template, { ...this.props });
  }
}

export default Component;
