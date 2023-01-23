type EventBusArgsProps = {
  args: { [key: string]: string };
};

class EventBus {
  listeners: {
    [key: string]: Function[];
  };
  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: VoidFunction) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: VoidFunction) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: EventBusArgsProps[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}

export default EventBus;
