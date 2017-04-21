/**
 * Created by sergey on 20.04.17.
 */

export class Bot {
    constructor(pos) {
        this.active = false;

        this.x = pos.x;
        this.y = pos.y;
        this.z = pos.z;
        this.del = 0.2;
        this.move = { xd: 0, yd: 0, zd: 0};
    }

    getState() {
        return this.active;
    }

    setState(state) {
        this.active = state;
    }

    setPosition(pos) {
        this.x = pos.x;
        this.y = pos.y;
        this.z = pos.z;
    }

    getBehavior(posBall) {
        this.move = { xd: 0, yd: 0, zd: 0};
        if(posBall.x - this.x >= this.del) {
            this.move.xd = this.del;
        } else if (this.x - posBall.x  >= this.del) {
            this.move.xd = -this.del;
        }
        return this.move;
    }
}