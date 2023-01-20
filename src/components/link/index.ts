import { pageOpen, render, rnd } from "../../index";

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

export let stack = {};

class Component {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element = null;
  _meta = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @param childs
   * @returns {void}
   */
  constructor(tagName = "div", propsAndChilds = {}) {
    const { children, props } = this.getChildren(propsAndChilds);

    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this.temp = () => render;

    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  getChildren(propsAndChilds) {
    const children = propsAndChilds;
    const props = propsAndChilds;
    //
    // Object.keys(propsAndChilds).forEach((key) => {
    //   if (propsAndChilds[key] instanceof Component)
    //     children[key] = propsAndChilds[key];
    //   else props[key] = propsAndChilds[key];
    // });
    //
    // console.log(props);

    return { children, props };
  }

  _registerEvents(eventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();

    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = block;

    let elements = this._element.querySelectorAll("*[id]");
    let myArray = Array.from(elements);
    if (myArray.length) {
      const idd = myArray[0].getAttribute("id");
      if (document.querySelector(`#${idd}`)) rnd(`#${idd}`, stack[idd]);
    }
    // const root = document.querySelector("#a4");
    // if (stack["a4"] && root) {
    //   rnd("#a4", stack["a4"]);
    // }

    this._addEvents();
  }

  render() {
    this.element.setAttribute("href", this.props["href"]);

    // if (this.props.modules) {
    //   const fragment = this._createDocumentElement("template");
    //   fragment.innerHTML = `<div id="a4">123</div>`;
    //   //return `${this.props.modules.getContent()}`;
    //   const stub = fragment.content.querySelector(`#a4`);
    //   stub.replaceWith(this.props.modules.getContent());
    //   console.log(fragment.content);
    //   return fragment.innerHTML;
    // }

    //let e = this.props.children;

    //console.log(this.props.children.querySelector("#a4"));

    return `${this.props.children}`;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Component.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
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
    super("form", props);
  }
}

class Text extends Component {
  props: any;
  constructor(props: any) {
    super("button", props);
  }
}

const test = new Text({
  children: "отправить",
  events: {
    click: (event) => {
      alert("ok2s");
    },
  },
});

export const button = new Link({
  title: "text",
  href: "profile",
  children: 'Заголовок <br /> <div id="a4"></div>',
  events: {
    submit: (event) => {
      event.preventDefault();
      test.hide();
      button.setProps({
        children: "Отправлено",
      });
    },
  },
});

// const button2 = new Link({
//   title: new Link({ title: "tttt" }),
//   href: "profile",
// });

stack = { ["a5"]: button, ["a4"]: test };

export const link = () => {
  setTimeout(() => {
    test.setProps({
      children: "xxxxxx",
    });
  }, 1000);
  setTimeout(() => {
    button.setProps({
      href: "/",
    });
  }, 3000);
  setTimeout(() => {
    test.setProps({
      children: "vvvvvv",
    });
  }, 4000);
  setTimeout(() => {
    button.setProps({
      href: "/ololo/",
    });
  }, 5000);
  return '<div id="a5"></div>';
};
