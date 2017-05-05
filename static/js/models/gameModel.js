/**
 * Created by tlakatlekutl on 19.04.17.
 */
import Transport from '../modules/gameTransport/transport';
// import EventEmitter from '../modules/eventEmitter/eventEmitter';

// const ee = new EventEmitter();

export default class GameModel {
  constructor() {
    if (GameModel.instance) {
      return GameModel.instance;
    }
    // transport.send() lala
    this.transport = new Transport();
    GameModel.instance = this;
  }

  // handleEvent(message) {
  //	console.log(`Hi from GM ${message}`);
  // 	ee.emit('msg', message);
  // }

  findOpponent() {
    this.transport.send('com.aerohockey.mechanics.requests.JoinGame$Request', '{}');
  }

  sendButton(button, frameTime) {
    this.transport.send('com.aerohockey.mechanics.base.ClientSnap', JSON.stringify({ button, frameTime }));
  }
}
