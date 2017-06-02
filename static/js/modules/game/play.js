/**
 * Created by sergey on 21.04.17.
 */

import SingleStrategy from './strategy';
import MultiStrategy from './multi';

export default class Game {
    constructor(state) {
        this.state = state;
        this.play = true;
        if(this.state === 'single') {
            this.games = new SingleStrategy();
        } else {
            this.games = new MultiStrategy();
        }
    }

    gameProcess () {
        if(this.state === 'single') {
            if (this.play === true) {
                this.games.animationScene();
            }
        } else {
            if (this.play === true) {
                this.games.animationScene();
            }
        }
    }

    stop() {
      this.games.stop();
    }

    resume() {
      this.games.resume();
      this.gameProcess();
    }

    setStateGame(message, time) {
      this.games.setStateGame(JSON.parse(message), time);
    }

    setChangeGame(message) {
      this.games.setChangeGame(JSON.parse(message));
    }

    setOpponent(message) {
      this.games.setOpponent(JSON.parse(message));
    }

}
