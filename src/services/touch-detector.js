const ALLOWED_VERTICAL_OFFSET = 20; // in pixels

const eventOptions = {
  passive: true
};

export class TouchDetector {
  constructor(el) {
    this.el = el;
    this.startX = null;
    this.startY = null;
    this.touchedTimer = null;
    this.destroyTimer = null;
    this.ignoreSelectors = [];

    this.init();
  }

  init() {
    this.el.addEventListener('touchstart', this, eventOptions);
  }

  destroy() {
    this.reset();
    this.el.removeEventListener('touchstart', this, eventOptions);
  }

  reset() {
    this.stopResetTimer();
    this.stopTouchTimer();
    this.removeCssClass();
    this.el.removeEventListener('touchmove', this, eventOptions);
    this.el.removeEventListener('touchend', this, eventOptions);
  }

  handleEvent(event) {
    const handler = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
    if (handler in this) {
      this[handler](event);
    }
  }

  addCssClass() {
    this.el.classList.add('touched');
  }

  removeCssClass() {
    this.el.classList.remove('touched');
  }

  setIgnoreSelectors(ignoreSelectors) {
    this.ignoreSelectors = ignoreSelectors;
  }

  onTouchstart(event) {
    if (this.isPreventHandeling(event.target)) {
      return;
    }

    this.stopTouchTimer();
    this.el.addEventListener('touchmove', this, eventOptions);
    this.el.addEventListener('touchend', this, eventOptions);

    const [touch] = event.touches;
    this.startX = touch.clientX;
    this.startY = touch.clientY;

    // This timer handler case when user taps and holds on an element.
    // So, basically when user tap on the element we wait for some time
    // and if 'touchmove' event didn't appear we considered element to be tapped.
    this.touchedTimer = setTimeout(() => this.addCssClass(), 100);
    this.destroyTimer = setTimeout(() => this.reset(), 1000);
  }

  isPreventHandeling(eventTarget) {
    return this.ignoreSelectors.some((selector) => {
      return eventTarget.closest(selector) !== null;
    });
  }

  onTouchmove(event) {
    const { clientY } = event.touches[0];

    if (Math.abs(clientY - this.startY) > ALLOWED_VERTICAL_OFFSET) {
      this.reset();
    } else {
      this.stopResetTimer();
    }
  }

  onTouchend(event) {
    const { clientX, clientY } = event.changedTouches[0];

    if (this.startX === clientX && this.startY === clientY) {
      this.stopTouchTimer();
      this.addCssClass();
      this.touchedTimer = setTimeout(() => this.reset(), 100);
    } else {
      this.reset();
    }
  }

  stopTouchTimer() {
    if (this.touchedTimer !== null) {
      clearTimeout(this.touchedTimer);
      this.touchedTimer = null;
    }
  }

  stopResetTimer() {
    if (this.destroyTimer !== null) {
      clearTimeout(this.destroyTimer);
      this.destroyTimer = null;
    }
  }
}
