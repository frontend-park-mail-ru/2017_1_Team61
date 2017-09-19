/**
 * Created by sergey on 15.04.17.
 */

import * as THREE from 'three';
import {GameObject} from './object';

export class Ground extends GameObject {
  constructor(pos, size) {
    super(pos);
    this.width = size.width;
    this.height = size.height;
    this.depth = size.depth;

    this.Geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    this.Material = new THREE.MeshLambertMaterial({ color: 0xF7F6EE });
    this.model = new THREE.Mesh(this.Geometry, this.Material);
    this.model.position.set(this.X, this.Y, this.Z);
    this.model.castShadow = false;
    this.model.receiveShadow = true;
    this.goalMy = this.depth - 0.5;
    this.goalEnemy = 0.5;
  }

  getSize() {
    return { width: this.width, height: this.height, depth: this.depth };
  }

  getModel() {
    return this.model;
  }

  getGoalMy() {
    return this.goalMy;
  }

  getGoalEnemy() {
    return this.goalEnemy;
  }
}