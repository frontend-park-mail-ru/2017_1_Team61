/**
 * Created by tlakatlekutl on 19.04.17.
 */

export default class EventEmitter {
  constructor() {
    if (EventEmitter.instance) {
      return EventEmitter.instance;
    }
    this.events = [];

    EventEmitter.instance = this;
  }
  on(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('listener is not a function');
    }
    this.events.push({ event, listener });
  }
  emit(name, payload = null) {
    const handler = this.events.find((x) => { if (x.event === name) { return x; } });
    if (handler) {
      handler.listener(payload);
    } else {
      throw new Error(`Cant emit no event ${name}`);
    }
  }
  off(name) {
    const i = this.events.findIndex((x) => { if (x.event === name) { return x; } });
    if (i !== -1) {
      delete this.events[i];
    } else {
      throw new Error(`Cant delete no event ${name}`);
    }
  }
}
