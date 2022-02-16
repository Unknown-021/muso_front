import { removeArrayElement } from './array';

let timerId = 0;

export class TimeoutManager {
  constructor() {
    this.timers = [];
    this.isFreeze = false;
  }

  add(handler, timeout, ...args) {
    const timer = {
      id: timerId++,
      timeoutId: 0,
      timeout,
      runningTime: 0,
      startTime: 0,
      handler: () => {
        this.remove(timer);
        handler(...args);
      }
    };
    runTimer(timer);
    if (this.isFreeze) {
      stopTimer(timer);
    }
    this.timers.push(timer);
    return timer;
  }

  remove(timer) {
    stopTimer(timer);
    removeArrayElement(this.timers, timer);
  }

  freeze() {
    if (this.isFreeze) return;
    this._stopTimers();
    this.isFreeze = true;
  }

  release() {
    if (!this.isFreeze) return;
    this.timers.forEach(runTimer);
    this.isFreeze = false;
  }

  clear() {
    this._stopTimers();
    this.timers = [];
  }

  _stopTimers() {
    this.timers.forEach(stopTimer);
  }
}

function runTimer(timer) {
  const timeLeft = Math.max(timer.timeout - timer.runningTime, 0);
  timer.timeoutId = setTimeout(timer.handler, timeLeft);
  timer.startTime = Date.now();
}

function stopTimer(timer) {
  clearTimeout(timer.timeoutId);
  timer.runningTime += Date.now() - timer.startTime;
}
