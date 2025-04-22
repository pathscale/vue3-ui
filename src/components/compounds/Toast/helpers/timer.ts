type Callback = () => void;

// https://stackoverflow.com/a/3969760
export default class Timer {
  startedAt: number;
  callback: Callback;
  delay: number;
  timer: number;

  constructor(callback: Callback, delay: number) {
    this.startedAt = Date.now();
    this.callback = callback;
    this.delay = delay;

    this.timer = window.setTimeout(callback, delay);
  }

  pause() {
    this.stop();
    this.delay -= Date.now() - this.startedAt;
  }

  resume() {
    this.stop();
    this.startedAt = Date.now();
    this.timer = setTimeout(this.callback, this.delay);
  }

  stop() {
    clearTimeout(this.timer);
  }
}
