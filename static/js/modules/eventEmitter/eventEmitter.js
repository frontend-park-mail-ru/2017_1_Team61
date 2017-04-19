/**
 * Created by tlakatlekutl on 19.04.17.
 */

export default class EventEmitter {
  constructor() {
    if (EventEmitter.instance) {
      return EventEmitter.instance;
    }

    EventEmitter.instance = this;
  }
  on(event, listener) {

  }
}
