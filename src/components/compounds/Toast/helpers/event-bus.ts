// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Callback = (data?: any) => void;

type Queue = Record<string, Callback[]>;

class EventBus {
  queue: Queue;

  constructor() {
    this.queue = {};
  }

  $on(name: string, callback: Callback) {
    this.queue[name] = this.queue[name] || [];
    this.queue[name].push(callback);
  }

  $off(name: string, callback: Callback) {
    if (this.queue[name]) {
      for (let i = 0; i < this.queue[name].length; i++) {
        if (this.queue[name][i] === callback) {
          this.queue[name].splice(i, 1);
          break;
        }
      }
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  $emit(name: string, data?: any) {
    if (this.queue[name]) {
      for (const callback of this.queue[name]) {
        callback(data);
      }
    }
  }
}

export default new EventBus();
