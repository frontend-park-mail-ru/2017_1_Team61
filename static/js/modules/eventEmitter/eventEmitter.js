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
    this.events.push({event, listener});

  }
  emit(name, payload = null) {

  }
  off() {

  }
}
