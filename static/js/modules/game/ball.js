/**
 * Created by sergey on 15.04.17.
 */
import {GameObject} from './object';

export class Ball extends GameObject {
    constructor(side, pos, radius) {
        super(pos);
        this.radius = radius;

        this.side = side;
        this.move = false;
        this.vectorMove = { x: 0, y: 0, z: 0 };

        this.Geometry = new THREE.SphereGeometry(this.radius, 20, 20);
        this.Material = new THREE.MeshLambertMaterial({ color: 0xE7DF32 });
        this.model = new THREE.Mesh(this.Geometry, this.Material);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    getSize() {
        return this.radius;
    }

    getSide() {
        return this.side;
    }

    getMove() {
        return this.move;
    }

    getVectorMove() {
        return this.vectorMove;
    }

    getModel() {
        return this.model;
    }

    setPosition(pos) {
        super.setPosition(pos);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    setMove(state) {
        this.move = state;
    }

    setVectorMove(vector) {
        this.vectorMove.x = vector.x;
        this.vectorMove.y = vector.y;
        this.vectorMove.z = vector.z;
    }
}