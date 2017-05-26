/**
 * Created by sergey on 16.05.17.
 */

import * as THREE from 'three';
import {GameObject} from './object';

export class Bonus extends GameObject {
  constructor(type, pos, radius) {
    super(pos);

    this.radius = radius;

    this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
    this.Material = new THREE.MeshLambertMaterial({ color: 0x54FF9F });

    if (type === 'BALL_INCREASE') {
      this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
      this.Material = new THREE.MeshLambertMaterial({ color: 0x54FF9F });
    } else if (type === 'BALL_DECREASE') {
      this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
      this.Material = new THREE.MeshLambertMaterial({ color: 0xFE28A2 });
    } else if (type === 'BALL_MULTIPLY') {
      console.log("multiply");
      this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
      this.Material = new THREE.MeshLambertMaterial({ color: 0xF4C430 });
    } else if (type === 'PLATFORM_INCREASE') {
      this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
      this.Material = new THREE.MeshLambertMaterial({ color: 0x4FFF18 });
    } else if (type === 'PLATFORM_DECREASE') {
      this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
      this.Material = new THREE.MeshLambertMaterial({ color: 0xFF4F18 });
    }

    this.model = new THREE.Mesh(this.Geometry, this.Material);
    this.model.position.set(this.X, this.Y, this.Z);
  }

  getSize() {
    return this.radius;
  }

  getModel() {
    return this.model;
  }

  setPosition(pos) {
    super.setPosition(pos);
    this.model.position.set(this.X, this.Y, this.Z);
  }
}