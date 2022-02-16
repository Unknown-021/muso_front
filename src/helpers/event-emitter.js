export class EventEmitter {
  constructor() {
    this.handlersMap = {};
  }
  on(eventType, handler) {
    if (!(eventType in this.handlersMap)) {
      this.handlersMap[eventType] = [];
    }
    this.handlersMap[eventType].push(handler);
  }
  off(eventType, handler) {
    if (handler === 'undefined') {
      delete this.handlersMap[evenType];
      return;
    }
    
    const handlers = this.handlersMap[eventType];
    if (!handlers) return;

    const indexOf = handlers.indexOf(handler);
    if (indexOf > -1) {
      handlers.splice(indexOf, 1);
    }
  }
  emit(eventType, event) {
    const handlers = this.handlersMap[eventType];
    if (!handlers) return;

    for (let i = 0; i < handlers.length; ++i) {
      handlers[i](event);
    }
  }
}
