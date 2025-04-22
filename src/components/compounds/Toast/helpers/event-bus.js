class Event {
  constructor() {
    this.queue = {};
  }

  $on(name, callback) {
    this.queue[name] = this.queue[name] || [];
    this.queue[name].push(callback);
  }

  $off(name, callback) {
    if (this.queue[name]) {
      for (let i = 0; i < this.queue[name].length; i++) {
        if (this.queue[name][i] === callback) {
          this.queue[name].splice(i, 1);
          break;
        }
      }
    }
  }

  $emit(name, data) {
    if (this.queue[name]) {
      for (const callback of this.queue[name]) {
        callback(data);
      }
    }
  }
}

export default new Event();
