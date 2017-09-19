/**
 * Created by sergey on 15.04.17.
 */

import * as THREE from 'three';
import {GameObject} from './object';

export class Ball extends GameObject {
  constructor(side, pos, radius) {
    super(pos);
    this.radius = radius;
    this.baseRadius = radius;

    this.side = side;
    this.move = false;
    this.speed = 3;
    this.baseSpeed = 3;
    this.time = 0;
    this.vectorMove = { x: 0, y: 0, z: 0 };

    this.Geometry = new THREE.SphereGeometry(this.radius, 20, 20);
    this.Material = new THREE.MeshLambertMaterial({ color: 0xE7DF32 });
    this.model = new THREE.Mesh(this.Geometry, this.Material);
    this.model.position.set(this.X, this.Y, this.Z);
  }

  getSize() {
    return this.radius;
  }

  getBaseSize() {
    return this.baseRadius;
  }


  setSize(radius) {
    this.radius = radius;
    this.Geometry = new THREE.SphereGeometry(this.radius, 20, 20);
    this.Material = new THREE.MeshLambertMaterial({ color: 0xE7DF32 });
    this.model = new THREE.Mesh(this.Geometry, this.Material);
    this.Y = 10 + this.radius;
    this.model.position.set(this.X, this.Y, this.Z);
  }

  getSide() {
    return this.side;
  }

  getSpeed() {
    return this.speed;
  }

  getBaseSpeed() {
    return this.baseSpeed;
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

  setSide(side) {
    this.side = side;
  }

  setVectorMove(vector) {
    this.vectorMove.x = vector.x;
    this.vectorMove.y = vector.y;
    this.vectorMove.z = vector.z;
  }

  moveUpVector() {
    this.X += this.vectorMove.x;
    this.Y += this.vectorMove.y;
    this.Z += this.vectorMove.z;
    this.model.position.set(this.X, this.Y, this.Z);
  }

  setEffect() {
    this.time = (new Date()).getTime();
  }

  checkEffect() {
    if ((new Date()).getTime() - this.time < 10000) {
      return true;
    }
    return false;
  }

  increaseSpeed() {
    const newSpeed = this.speed + 0.001;
    this.vectorMove.x *= newSpeed / this.speed;
    this.vectorMove.z *= newSpeed / this.speed;
    this.speed = newSpeed;
  }
}
