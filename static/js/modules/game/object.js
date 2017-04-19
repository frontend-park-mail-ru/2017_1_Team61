/**
 * Created by sergey on 15.04.17.
 */
export class GameObject {
    constructor(pos) {
        this.X = pos.x;
        this.Y = pos.y;
        this.Z = pos.z;
    }

    setPosition(pos) {
        this.X = pos.x;
        this.Y = pos.y;
        this.Z = pos.z;
    }

    getPosition() {
        return {x: this.X, y: this.Y, z: this.Z };
    }
}