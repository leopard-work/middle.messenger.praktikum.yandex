import { pageOpen, render } from "../../index";
import { v4 as uuidv4 } from "uuid";

class EventBus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event, ...args) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}

// class Component {
//   static EVENTS = {
//     INIT: "init",
//     FLOW_CDM: "flow:component-did-mount",
//     FLOW_CDU: "flow:component-did-update",
//     FLOW_RENDER: "flow:render",
//   };
//
//   _element = null;
//   _meta = null;
//
//   /** JSDoc
//    * @param {string} tagName
//    * @param {Object} props
//    *
//    * @param childs
//    * @returns {void}
//    */
//   constructor(tagName = "div", props = {}, childs = {}) {
//     const eventBus = new EventBus();
//     this._meta = {
//       tagName,
//       props,
//       childs,
//     };
//
//     this.props = this._makePropsProxy(props);
//
//     this.eventBus = () => eventBus;
//
//     this._registerEvents(eventBus);
//     eventBus.emit(Component.EVENTS.INIT);
//   }
//
//   _registerEvents(eventBus) {
//     eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
//     eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
//     eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
//     eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
//   }
//
//   _createResources() {
//     const { tagName } = this._meta;
//     this._element = this._createDocumentElement(tagName);
//   }
//
//   init() {
//     this._createResources();
//
//     this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
//   }
//
//   _componentDidMount() {
//     this.componentDidMount();
//   }
//
//   componentDidMount(oldProps) {}
//
//   dispatchComponentDidMount() {
//     this.eventBus().emit(Component.EVENTS.FLOW_CDM);
//   }
//
//   _componentDidUpdate(oldProps, newProps) {
//     const response = this.componentDidUpdate(oldProps, newProps);
//     if (!response) {
//       return;
//     }
//     this._render();
//   }
//
//   componentDidUpdate(oldProps, newProps) {
//     return true;
//   }
//
//   setProps = (nextProps) => {
//     if (!nextProps) {
//       return;
//     }
//
//     Object.assign(this.props, nextProps);
//   };
//
//   get element() {
//     return this._element;
//   }
//
//   _render() {
//     const block = this.render();
//     // Этот небезопасный метод для упрощения логики
//     // Используйте шаблонизатор из npm или напишите свой безопасный
//     // Нужно не в строку компилировать (или делать это правильно),
//     // либо сразу в DOM-элементы возвращать из compile DOM-ноду
//     this._element.innerHTML = block;
//
//     this._addEvents();
//   }
//
//   render() {
//     this.element.setAttribute("href", this.props["href"]);
//
//     // if (this.props.modules) {
//     //   const fragment = this._createDocumentElement("template");
//     //   fragment.innerHTML = `<div id="a4">123</div>`;
//     //   //return `${this.props.modules.getContent()}`;
//     //   const stub = fragment.content.querySelector(`#a4`);
//     //   stub.replaceWith(this.props.modules.getContent());
//     //   console.log(fragment.content);
//     //   return fragment.innerHTML;
//     // }
//
//     return `${this.props.children}`;
//   }
//
//   getContent() {
//     return this.element;
//   }
//
//   _makePropsProxy(props) {
//     // Можно и так передать this
//     // Такой способ больше не применяется с приходом ES6+
//     const self = this;
//
//     return new Proxy(props, {
//       get(target, prop) {
//         const value = target[prop];
//         return typeof value === "function" ? value.bind(target) : value;
//       },
//       set(target, prop, value) {
//         target[prop] = value;
//
//         // Запускаем обновление компоненты
//         // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
//         self.eventBus().emit(Component.EVENTS.FLOW_CDU, { ...target }, target);
//         return true;
//       },
//       deleteProperty() {
//         throw new Error("Нет доступа");
//       },
//     });
//   }
//
//   _createDocumentElement(tagName) {
//     // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
//     return document.createElement(tagName);
//   }
//
//   show() {
//     this.getContent().style.display = "block";
//   }
//
//   hide() {
//     this.getContent().style.display = "none";
//   }
//
//   _addEvents() {
//     const { events = {} } = this.props;
//
//     Object.keys(events).forEach((eventName) => {
//       this._element.addEventListener(eventName, events[eventName]);
//     });
//   }
// }

class Component {
  static EVENT_INIT = "init";
  static EVENT_FLOW_CDM = "flow:component-did-mount";
  static EVENT_FLOW_CDU = "flow:component-did-update";
  static EVENT_FLOW_RENDER = "flow:render";

  _props;
  _children;
  _id;
  _element;
  _meta;
  _eventBus;
  _setUpdate = false;

  constructor(tag = "div", propsAndChilds = {}) {
    const { children, props } = this.getChildren(propsAndChilds);

    this._eventBus = new EventBus();
    this._id = uuidv4();
    this._children = children;
    //this._children = this.makePropsProxy(children);
    this._props = this.makePropsProxy({ ...props, __id: this._id });
    this._meta = { tag, props };

    this.registerEvents();
    this._eventBus.emit(Component.EVENT_INIT);
  }

  registerEvents() {
    this._eventBus.on(Component.EVENT_INIT, this.init.bind(this));
    this._eventBus.on(
      Component.EVENT_FLOW_CDM,
      this._componentDidMount.bind(this)
    );
    this._eventBus.on(
      Component.EVENT_FLOW_CDU,
      this._componentDidUpdate.bind(this)
    );
    this._eventBus.on(Component.EVENT_FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._element = this.createDocumentElement(this._meta?.tag);
    this._eventBus.emit(Component.EVENT_FLOW_RENDER);
  }

  createDocumentElement(tag) {
    const element = document.createElement(tag);
    if (this._props._settings?.withInternalID)
      element.setAttribute("data-id", this._id);
  }

  _render() {
    const block = this.render();
    this.removeEvents();
    //this._element.innerHTML = "";
    //this._element.appendChild(block);
    this.addEvents();
    //this.setAttribute();
  }

  render() {}

  addEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName) => {
      //this._element.addEventListener(eventName, events[eventName]);
    });
  }

  removeEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName) => {
      //this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  addAtribute() {
    const { attr = {} } = this._props;

    Object.entries(attr).forEach(([key, value]) => {
      this._element.setAttribute(key, value);
    });
  }

  getChildren(propsAndChilds) {
    const children = {};
    const props = {};

    Object.keys(propsAndChilds).forEach((key) => {
      if (propsAndChilds[key] instanceof Component)
        children[key] = propsAndChilds[key];
      else props[key] = propsAndChilds[key];
    });

    return { children, props };
  }

  compile(template, props) {
    if (typeof props == "undefined") {
      props = this._props;
    }

    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this.createDocumentElement("template");
    fragment.innerHTML = template;

    Object.values(this._children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this._children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Component.EVENT_FLOW_CDM);
    if (Object.keys(this._children).length)
      this._eventBus.emit(Component.EVENT_FLOW_RENDER);
  }

  _componentDidUpdate(oldProps, newProps) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);
    if (isReRender) this._eventBus.emit(Component.EVENT_FLOW_RENDER);
  }

  componentDidUpdate(oldProps, newProps) {
    console.log(newProps, oldProps);
    return true;
    // return newProps['title'] !== oldProps['title'];
  }

  setProps(newProps) {
    if (!newProps) return;

    const { children, props } = this.getChildren(newProps);

    if (Object.values(children).length) Object.assign(this._children, children);

    if (Object.values(props).length) Object.assign(this._props, props);
  }

  makePropsProxy(props) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldValue = { ...target };
        target[prop] = value;
        this._eventBus.emit(Component.EVENT_FLOW_CDU, oldValue, target);
        return true;
      },
    });
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }

  getContent() {
    return this._element;
  }
}

export type linkProps = {
  title: string;
  href: string;
  className?: string;
};

// export const link = ({ title = "", href = "", className = "" }: linkProps) => {
//   return `<a rel="link" class="${className}" href="${href}">${title}</a>`;
// };

class Link extends Component {
  props: any;
  constructor(props: any) {
    super("a", props);
  }
}

// class Text extends Component {
//   props: any;
//   constructor(props: any) {
//     super("p", props);
//   }
// }
//
// const test = new Text({
//   title: "tttt",
//   events: {
//     click: (event) => {
//       event.preventDefault();
//       alert("ok2s");
//     },
//   },
// });

export const button = new Link({
  title: "text",
  href: "profile",
  children: "<div id='a4'>123</div>",
  events: {
    click: (event) => {
      event.preventDefault();
      alert("ok");
    },
  },
});

const button2 = new Link({
  title: new Link({ title: "tttt" }),
  href: "profile",
});

export const stack = { ["a5"]: button, ["a4"]: "s" };

export const link = () => {
  // setTimeout(() => {
  //   test.setProps({
  //     children: "xxxxxx",
  //   });
  // }, 1000);
  // setTimeout(() => {
  //   button.setProps({
  //     href: "/",
  //   });
  //   render("#a4", stack["a4"]);
  // }, 3000);
  // setTimeout(() => {
  //   test.setProps({
  //     children: "vvvvvv",
  //   });
  // }, 4000);
  // setTimeout(() => {
  //   button.setProps({
  //     href: "/ololo/",
  //   });
  //   render("#a4", stack["a4"]);
  // }, 5000);
  return '<div id="a5"></div>';
};
