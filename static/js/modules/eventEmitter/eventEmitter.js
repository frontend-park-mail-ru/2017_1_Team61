/**
 * Created by tlakatlekutl on 19.04.17.
 */

export const START_USER_UNAUTHORISED = 'start_user_unauthorised';
export const START_USER_AUTHORISED = 'start_user_authorised';

export const GAME_PAUSE = 'game_pause_event';
export const DESTROY_GAME = 'game_destroy_event';

export const TEST_EVENT = 'test_event';

export const START_SINGLE_GAME = 'start_single_game_event';
export const START_MULTI_GAME = 'start_multiplayer_game_event';

export const LOGINED = 'user logined';
export const LOGOUTED = 'user logout';

export const VICTORY = 'victory_event';
export const DEFEAT = 'defeat event';

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
    return this;
  }
  emit(name, payload = null) {
    // console.log(`EVENT: ${name}`);
    const handler = this.events.find(x => x.event === name);
    if (handler) {
      handler.listener(payload);
    } else {
      throw new Error(`Cant emit no event ${name}`);
    }
  }
  off(name) {
    const i = this.events.findIndex(x => x.event === name);
    if (i !== -1) {
      this.events.splice(i, 1);
    } else {
      throw new Error(`Cant delete no event ${name}`);
    }
  }
}
