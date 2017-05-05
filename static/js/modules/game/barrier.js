/**
 * Created by sergey on 15.04.17.
 */

import {GameObject} from './object';

export class Barrier extends GameObject {
    constructor(pos, size, angle) {
        super(pos);
        this.width = size.width;
        this.height = size.height;
        this.depth = size.depth;

        this.angle = angle;

        this.Geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        this.Material = new THREE.MeshLambertMaterial({color: 0xF2F0BA});
        this.model = new THREE.Mesh(this.Geometry, this.Material);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    getSize() {
        return { width: this.width, height: this.height, depth: this.depth };
    }

    getSide() {
        return this.side;
    }

    getAngle() {
        return this.angle;
    }

    getModel() {
        return this.model;
    }
}