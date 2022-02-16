import { EventEmitter } from './event-emitter';
import { debounce } from 'helpers/utils';
import { isServer } from './constants';
import { getScrollableParent } from './dom';

const defaultOptions = {
  triggerEl: isServer ? undefined : document.documentElement,
  offset: 0,
  duration: 0
};

export class ScrollScene extends EventEmitter {
  constructor(options) {
    super();
    this.options = {
      ...defaultOptions,
      ...options
    };
    this.progress = 0;
    this.scrollContainerEl = getScrollableParent(this.options.triggerEl);

    this.onWindowResize = debounce(this.update.bind(this), 500);
    this.onScroll = this.calcProgress.bind(this);

    this._calcCoords();
    this._init();
  }

  setOptions(options) {
    this.options = {
      ...this.options,
      ...options
    };
    this.update();
  }

  update() {
    this._calcCoords();
    this.calcProgress();
  }

  _calcCoords() {
    const scrollContainerCoords = this.scrollContainerEl.getBoundingClientRect();
    const targetCoords = this.options.triggerEl.getBoundingClientRect();
    const targetTop = this.scrollContainerEl.scrollTop + targetCoords.top;
    const topWithinScrollContainer = targetTop - scrollContainerCoords.top;

    this.startY = topWithinScrollContainer + this.options.offset;
    this.endY = this.startY + this.options.duration;
  }

  _init() {
    this.scrollContainerEl.addEventListener('scroll', this, { passive: true });
    window.addEventListener('resize', this);
  }

  destroy() {
    this.scrollContainerEl.removeEventListener('scroll', this, { passive: true });
    window.removeEventListener('resize', this);
    this.off('progress');
  }

  handleEvent(event) {
    if (event.type === 'scroll') {
      this.onScroll(event);
    } if (event.type === 'resize') {
      this.onWindowResize(event);
    }
  }

  calcProgress() {
    const { scrollTop } = this.scrollContainerEl;
    if (scrollTop > this.endY) {
      return this._makeSureRoundingTo(1);
    } else if (scrollTop < this.startY) {
      return this._makeSureRoundingTo(0);
    } else if (this.options.duration === 0) {
      return;
    }

    const diffX = scrollTop - this.startY;
    this.progress = diffX / this.options.duration;
    this.emitProgress();
  }

  _makeSureRoundingTo(value) {
    if (this.progress !== value) {
      this.progress = value;
      this.emitProgress();
    }
  }

  emitProgress() {
    this.emit('progress', {
      progress: this.progress
    });
  }
}
