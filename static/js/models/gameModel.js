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
    this.transport = new Transport();
    GameModel.instance = this;
  }
  findOpponent() {
    if (!this.transport) {
      this.transport = new Transport();
    }
    this.transport.send('com.aerohockey.mechanics.requests.JoinGame$Request', '{}');
  }

  sendButton(button, frameTime) {
    this.transport.send('com.aerohockey.mechanics.base.ClientSnap', JSON.stringify({ button, frameTime }));
  }
  exit(){
    this.transport.closeSocket();
    delete this.transport;

  }
}
