/**
 * Created by sergey on 21.04.17.
 */

import EventEmitter from '../eventEmitter/eventEmitter';

const ee = new EventEmitter();

export default class Transport {
  constructor() {
    // if (Transport.instance) {
    //   return Transport.instance;
    // }
    const address = 'ws://62.109.3.208:8082/game';

    this.ws = new WebSocket(address);
    this.ws.onopen = () => {
      console.log(`Success connect to socket ${address}`);
    };
    this.ws.onclose = (event) => {
      console.log(`Socket closed with code ${event.code}`);
    };
    this.ws.onmessage = (event) => { this.handleMessage(event); };

    // Transport.instance = this;
  }

  handleMessage(event) {
    const messageText = event.data;
    const message = JSON.parse(messageText);
    // if (message.type === 'com.aerohockey.mechanics.base.ServerSnap') {

    ee.emit(message.type, message);
    // }
    // else {
    //   //console.log(message);
    //   ee.emit('print', messageText);
    // }
  }

  send(type, content) {
    if (this.ws.readyState === this.ws.CONNECTING) {
      setTimeout(() => {
        this.ws.send(JSON.stringify({ type, content }));
      }, 1000);
      return;
    };
    this.ws.send(JSON.stringify({type, content}));
  }
  closeSocket() {
    this.ws.close();
  }

}
