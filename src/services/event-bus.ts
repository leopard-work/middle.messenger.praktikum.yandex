import { BlockProps } from "../utils/types";

class EventBus {
  listeners: {
    [key: string]: ((...args: BlockProps[]) => void)[];
  };
  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (...args: BlockProps[]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: { [key: string]: string }[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}

export default EventBus;
