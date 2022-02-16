import { isServer } from 'helpers/constants';

class EventBroadcast extends EventEmitter {
  constructor() {
    this.eventHandler = this._eventHandler.bind(this);
    this.open();
  }

  open() {
    window.addEventListener('storage', this.eventHandler);
  }

  close() {
    this.offAll();
    window.removeEventListener('storage', this.eventHandler);
  }
  
  emit(event, data) {
    localStorage.setItem('broadcastMessage', JSON.stringify({ event, data }));
  }

  on(eventName, handler) {
    super.on(eventName, handler);
  }

  _eventHandler(event) {
    if (event.key === 'broadcastMessage') {
      const message = JSON.parse(event.newValue);
      super.emit(message.event, message.data);
    }
  }
}

export const eventBroadcast = (isServer ? null : new EventBroadcast());
