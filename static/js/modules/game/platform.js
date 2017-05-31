/**
 * Created by sergey on 15.04.17.
 */
import * as THREE from 'three';
import { GameObject } from './object';

export class Platform extends GameObject {
  constructor(side, pos, size) {
    super(pos);
    this.width = size.width;
    this.height = size.height;
    this.depth = size.depth;

    this.side = side;
    this.modelPos = pos;

    this.Geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    if (this.side === 0) {
      this.Material = new THREE.MeshLambertMaterial({ color: 0x1D870D });
    } else {
      this.Material = new THREE.MeshLambertMaterial({ color: 0xC70A00 });
    }
    this.model = new THREE.Mesh(this.Geometry, this.Material);
    this.model.position.set(this.modelPos.x, this.modelPos.y, this.modelPos.z);
  }

  getModelPosition() {
    return { x: this.modelPos.x, y: this.modelPos.y, z: this.modelPos.z };
  }

  setPosition(pos) {
    super.setPosition(pos);
    // this.model.position.set(this.X, this.Y, this.Z);
  }

  getSize() {
    return { width: this.width, height: this.height, depth: this.depth };
  }

  setSize(size) {
    this.width = size.width;
    this.height = size.height;
    this.Geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    if (this.side === 0) {
      this.Material = new THREE.MeshLambertMaterial({ color: 0x1D870D });
    } else {
      this.Material = new THREE.MeshLambertMaterial({ color: 0xC70A00 });
    }
    this.model = new THREE.Mesh(this.Geometry, this.Material);
    this.model.position.set(this.modelPos.x, this.modelPos.y, this.modelPos.z);
  }

  getSide() {
    return this.side;
  }

  getModel() {
    return this.model;
  }

  interpolation() {
    if (this.X > this.modelPos.x) {
      if (this.X - this.modelPos.x < 1.5) {
        this.move(this.X - this.modelPos.x);
      } else {
        this.move(1.5);
      }
    } else if (this.X < this.modelPos.x) {
      if (this.modelPos.x - this.X < 1.5) {
        this.move(this.X - this.modelPos.x);
      } else {
        this.move(-1.5);
      }
    }
  }

  move(speed) {
    this.modelPos.x += speed;
    this.model.position.set(this.modelPos.x, this.modelPos.y, this.modelPos.z);
  }
}
