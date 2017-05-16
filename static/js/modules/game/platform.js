/**
 * Created by sergey on 15.04.17.
 */
import { GameObject } from './object';

export class Platform extends GameObject {
    constructor(side, pos, size) {
        super(pos);
        this.width = size.width;
        this.height = size.height;
        this.depth = size.depth;

        this.side = side;

        this.Geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        if(side === 0) {
            this.Material = new THREE.MeshLambertMaterial({color: 0x1D870D});
        } else {
            this.Material = new THREE.MeshLambertMaterial({color: 0xC70A00});
        }
        this.model = new THREE.Mesh(this.Geometry, this.Material);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    setPosition(pos) {
        super.setPosition(pos);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    getSize() {
        return { width: this.width, height: this.height, depth: this.depth };
    }

    setSize(size) {
        this.width = size.width;
        this.height = size.height;
        this.Geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        if(side === 0) {
          this.Material = new THREE.MeshLambertMaterial({ color: 0x1D870D });
        } else {
          this.Material = new THREE.MeshLambertMaterial({ color: 0xC70A00 });
        }
        this.model = new THREE.Mesh(this.Geometry, this.Material);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    getSide() {
        return this.side;
    }

    getModel() {
        return this.model;
    }
}