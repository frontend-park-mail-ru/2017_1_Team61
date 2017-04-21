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

}
