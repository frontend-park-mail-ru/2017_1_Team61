/**
 * Created by sergey on 16.05.17.
 */

import * as THREE from 'three';
import {GameObject} from './object';

export class Bonus extends GameObject {
  constructor(type, pos, radius) {
    super(pos);

    this.radius = radius;
    this.type = type;

    this.pivotPoint = new THREE.Object3D();
    this.pivotPoint.position.set(this.X, this.Y, this.Z);

    if (type === 'PLATFORM_INCREASE') {
      const rightArrow = [];
      rightArrow.push(new THREE.Vector2(2.5, -2.5));
      rightArrow.push(new THREE.Vector2(2.5, 2.5));
      rightArrow.push(new THREE.Vector2(7.5, 2.5));
      rightArrow.push(new THREE.Vector2(7.5, 5));
      rightArrow.push(new THREE.Vector2(12.5, 0));
      rightArrow.push(new THREE.Vector2(7.5, -5));
      rightArrow.push(new THREE.Vector2(7.5, -2.5));

      const rightArrowShape = new THREE.Shape(rightArrow);
      const extrusionSettings = {
        amount: 5, curveSegments: 3,
        bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
        material: 0, extrudeMaterial: 1
      };

      const rightArrowGeometry = new THREE.ExtrudeGeometry(rightArrowShape, extrusionSettings);
      this.Material = new THREE.MeshLambertMaterial({ color: 0x4FFF18 });
      this.rightAr = new THREE.Mesh(rightArrowGeometry, this.Material);
      this.rightAr.position.set(0, 0, 0);
      this.pivotPoint.add(this.rightAr);

      const leftArrow = [];
      leftArrow.push(new THREE.Vector2(-2.5, -2.5));
      leftArrow.push(new THREE.Vector2(-2.5, 2.5));
      leftArrow.push(new THREE.Vector2(-7.5, 2.5));
      leftArrow.push(new THREE.Vector2(-7.5, 5));
      leftArrow.push(new THREE.Vector2(-12.5, 0));
      leftArrow.push(new THREE.Vector2(-7.5, -5));
      leftArrow.push(new THREE.Vector2(-7.5, -2.5));

      const leftArrowShape = new THREE.Shape(leftArrow);

      const leftArrowGeometry = new THREE.ExtrudeGeometry(leftArrowShape, extrusionSettings);
      this.Material = new THREE.MeshLambertMaterial({ color: 0x4FFF18 });
      this.leftAr = new THREE.Mesh(leftArrowGeometry, this.Material);
      this.leftAr.position.set(0, 0, 0);
      this.pivotPoint.add(this.leftAr);
    } else if (type === 'PLATFORM_DECREASE') {
      const rightArrow = [];
      rightArrow.push(new THREE.Vector2(2.5, 0));
      rightArrow.push(new THREE.Vector2(7.5, 5));
      rightArrow.push(new THREE.Vector2(7.5, 2.5));
      rightArrow.push(new THREE.Vector2(12.5, 2.5));
      rightArrow.push(new THREE.Vector2(12.5, -2.5));
      rightArrow.push(new THREE.Vector2(7.5, -2.5));
      rightArrow.push(new THREE.Vector2(7.5, -5));

      const rightArrowShape = new THREE.Shape(rightArrow);
      const extrusionSettings = {
        amount: 5, curveSegments: 3,
        bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
        material: 0, extrudeMaterial: 1
      };

      const rightArrowGeometry = new THREE.ExtrudeGeometry(rightArrowShape, extrusionSettings);
      this.Material = new THREE.MeshLambertMaterial({ color: 0xFF4F18 });
      this.rightAr = new THREE.Mesh(rightArrowGeometry, this.Material);
      this.rightAr.position.set(0, 0, 0);
      this.pivotPoint.add(this.rightAr);

      const leftArrow = [];
      leftArrow.push(new THREE.Vector2(-2.5, 0));
      leftArrow.push(new THREE.Vector2(-7.5, 5));
      leftArrow.push(new THREE.Vector2(-7.5, 2.5));
      leftArrow.push(new THREE.Vector2(-12.5, 2.5));
      leftArrow.push(new THREE.Vector2(-12.5, -2.5));
      leftArrow.push(new THREE.Vector2(-7.5, -2.5));
      leftArrow.push(new THREE.Vector2(-7.5, -5));

      const leftArrowShape = new THREE.Shape(leftArrow);

      const leftArrowGeometry = new THREE.ExtrudeGeometry(leftArrowShape, extrusionSettings);
      this.Material = new THREE.MeshLambertMaterial({ color: 0xFF4F18 });
      this.leftAr = new THREE.Mesh(leftArrowGeometry, this.Material);
      this.leftAr.position.set(0, 0, 0);
      this.pivotPoint.add(this.leftAr);
    } else if (type === 'BALL_MULTIPLY') {

      this.ballOneGeometry = new THREE.SphereGeometry(4, 30, 30);
      this.Material = new THREE.MeshLambertMaterial({ color: 0xF4C430 });
      this.ballOne = new THREE.Mesh(this.ballOneGeometry, this.Material);
      this.ballOne.position.set(1, 5.5, 1);
      this.pivotPoint.add(this.ballOne);

      this.ballTwoGeometry = new THREE.SphereGeometry(2.5, 30, 30);
      this.Material = new THREE.MeshLambertMaterial({ color: 0xF4C430 });
      this.ballTwo = new THREE.Mesh(this.ballTwoGeometry, this.Material);
      this.ballTwo.position.set(-2.5, 0, -1);
      this.pivotPoint.add(this.ballTwo);

      // this.ballThree = new THREE.SphereGeometry(this.radius, 30, 30);
      // this.Material = new THREE.MeshLambertMaterial({ color: 0xF4C430 });
      // this.model = new THREE.Mesh(this.Geometry, this.Material);
      // this.model.position.set(0, 0, 0);
      // this.pivotPoint.add(this.ballThree);
    } else if (type === 'SHIELD') {
      const shield = [];
      shield.push(new THREE.Vector2(0, -7.5));
      shield.push(new THREE.Vector2(-5, -2.5));
      shield.push(new THREE.Vector2(-7.5, 7.5));
      shield.push(new THREE.Vector2(7.5, 7.5));
      shield.push(new THREE.Vector2(5, -2.5));

      const shieldShape = new THREE.Shape(shield);
      const extrusionSettings = {
        amount: 4, curveSegments: 3,
        bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
        material: 0, extrudeMaterial: 1
      };

      const shieldGeometry = new THREE.ExtrudeGeometry(shieldShape, extrusionSettings);
      this.Material = new THREE.MeshLambertMaterial({ color: 0x3167F6 });
      this.shieldObj = new THREE.Mesh(shieldGeometry, this.Material);
      this.shieldObj.position.set(0, 0, 0);
      this.pivotPoint.add(this.shieldObj);
    } else if (type === 'BALL_INCREASE') {
      const upArrow = [];
      upArrow.push(new THREE.Vector2(2.5, -5));
      upArrow.push(new THREE.Vector2(-2.5, -5));
      upArrow.push(new THREE.Vector2(-2.5, 2.5));
      upArrow.push(new THREE.Vector2(-5, 2.5));
      upArrow.push(new THREE.Vector2(0, 7.5));
      upArrow.push(new THREE.Vector2(5, 2.5));
      upArrow.push(new THREE.Vector2(2.5, 2.5));

      const upArrowShape = new THREE.Shape(upArrow);
      const extrusionSettings = {
        amount: 4, curveSegments: 3,
        bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
        material: 0, extrudeMaterial: 1
      };

      const upArrowGeometry = new THREE.ExtrudeGeometry(upArrowShape, extrusionSettings);
      this.Material = new THREE.MeshLambertMaterial({ color: 0x54FF9F });
      this.upArrowObj = new THREE.Mesh(upArrowGeometry, this.Material);
      this.upArrowObj.position.set(0, 0, 0);
      this.pivotPoint.add(this.upArrowObj);
    } else if (type === 'BALL_DECREASE') {
      const downArrow = [];
      downArrow.push(new THREE.Vector2(0, -5));
      downArrow.push(new THREE.Vector2(-5, 0));
      downArrow.push(new THREE.Vector2(-2.5, 0));
      downArrow.push(new THREE.Vector2(-2.5, 7.5));
      downArrow.push(new THREE.Vector2(2.5, 7.5));
      downArrow.push(new THREE.Vector2(2.5, 0));
      downArrow.push(new THREE.Vector2(5, 0));

      const downArrowShape = new THREE.Shape(downArrow);
      const extrusionSettings = {
        amount: 4, curveSegments: 3,
        bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
        material: 0, extrudeMaterial: 1
      };

      const downArrowGeometry = new THREE.ExtrudeGeometry(downArrowShape, extrusionSettings);
      this.Material = new THREE.MeshLambertMaterial({ color: 0xFE28A2 });
      this.downArrowObj = new THREE.Mesh(downArrowGeometry, this.Material);
      this.downArrowObj.position.set(0, 0, 0);
      this.pivotPoint.add(this.downArrowObj);
    }

        // this.pivotPoint.add(this.leftAr);
    // if (type === 'BALL_INCREASE') {
    //   this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
    //   this.Material = new THREE.MeshLambertMaterial({ color: 0x54FF9F });
    //   this.model = new THREE.Mesh(this.Geometry, this.Material);
    //   this.model.position.set(this.X, this.Y, this.Z);
    // } else if (type === 'BALL_DECREASE') {
    //   this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
    //   this.Material = new THREE.MeshLambertMaterial({ color: 0xFE28A2 });
    //   this.model = new THREE.Mesh(this.Geometry, this.Material);
    //   this.model.position.set(this.X, this.Y, this.Z);
    // } else if (type === 'BALL_MULTIPLY') {
    //   console.log("multiply");
    //   this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
    //   this.Material = new THREE.MeshLambertMaterial({ color: 0xF4C430 });
    //   this.model = new THREE.Mesh(this.Geometry, this.Material);
    //   this.model.position.set(this.X, this.Y, this.Z);
    // } else if (type === 'PLATFORM_INCREASE') {
    //
    //   const rightArrow = [];
    //   rightArrow.push(new THREE.Vector2(this.X, this.Y));
    //   rightArrow.push(new THREE.Vector2(this.X, this.Y + 5));
    //   rightArrow.push(new THREE.Vector2(this.X + 7.5, this.Y + 5));
    //   rightArrow.push(new THREE.Vector2(this.X + 7.5, this.Y + 7.5));
    //   rightArrow.push(new THREE.Vector2(this.X + 10, this.Y + 2.5));
    //   rightArrow.push(new THREE.Vector2(this.X + 7.5, this.Y - 2.5));
    //   rightArrow.push(new THREE.Vector2(this.X + 7.5, this.Y));
    //
    //   const rightArrowShape = new THREE.Shape(rightArrow);
    //   const extrusionSettings = {
    //     amount: 5, curveSegments: 3,
    //     bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
    //     material: 0, extrudeMaterial: 1
    //   };
    //
    //   const rightArrowGeometry = new THREE.ExtrudeGeometry(rightArrowShape, extrusionSettings);
    //   // const materialFrontR = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    //   // const materialSideR = new THREE.MeshBasicMaterial({ color: 0xff8800 });
    //   // const materialArrayR = [materialFrontR, materialSideR];
    //   // const rightArrowMaterial = new THREE.MeshFaceMaterial(materialArrayR);
    //   this.Material = new THREE.MeshLambertMaterial({ color: 0x4FFF18 });
    //   this.rightAr = new THREE.Mesh(rightArrowGeometry, this.Material);
    //   this.pivotPoint.add(this.rightAr);
    //   this.rightAr.position.set(0, 0, 0);
    //
    //   const leftArrow = [];
    //   leftArrow.push(new THREE.Vector2(this.X - 2.5, this.Y));
    //   leftArrow.push(new THREE.Vector2(this.X - 2.5, this.Y + 5));
    //   leftArrow.push(new THREE.Vector2(this.X - 10, this.Y + 5));
    //   leftArrow.push(new THREE.Vector2(this.X - 10, this.Y + 7.5));
    //   leftArrow.push(new THREE.Vector2(this.X - 12.5, this.Y + 2.5));
    //   leftArrow.push(new THREE.Vector2(this.X - 10, this.Y - 2.5));
    //   leftArrow.push(new THREE.Vector2(this.X - 10, this.Y));
    //
    //   const leftArrowShape = new THREE.Shape(leftArrow);
    //
    //   const leftArrowGeometry = new THREE.ExtrudeGeometry(leftArrowShape, extrusionSettings);
    //   // const materialFrontL = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    //   // const materialSideL = new THREE.MeshBasicMaterial({ color: 0xff8800 });
    //   // const materialArrayL = [materialFrontL, materialSideL];
    //   // const leftArrowMaterial = new THREE.MeshFaceMaterial(materialArrayL);
    //   this.Material = new THREE.MeshLambertMaterial({ color: 0x4FFF18 });
    //   this.leftAr = new THREE.Mesh(leftArrowGeometry, this.Material);
    //   this.leftAr.position.set(this.X, this.Y, this.Z);
    //
    //   // this.pivotPoint.add(this.leftAr);
    //
    //   // this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
    //   // this.Material = new THREE.MeshLambertMaterial({ color: 0x4FFF18 });
    // } else if (type === 'PLATFORM_DECREASE') {
    //   this.Geometry = new THREE.SphereGeometry(this.radius, 30, 30);
    //   this.Material = new THREE.MeshLambertMaterial({ color: 0xFF4F18 });
    //   this.model = new THREE.Mesh(this.Geometry, this.Material);
    //   this.model.position.set(this.X, this.Y, this.Z);
    // }
    //
    // // this.model = new THREE.Mesh(this.Geometry, this.Material);
    // // this.model.position.set(this.X, this.Y, this.Z);
  }

  getSize() {
    return this.radius;
  }

  getType() {
    return this.type;
  }

  animation() {
    this.pivotPoint.rotation.y += 0.02;
  }

  getPivot() {
    return this.pivotPoint;
  }

  getModel() {
    return this.model;
    // this.models = [];
    // if (this.type === 'PLATFORM_INCREASE') {
    //   this.models.push(this.rightAr);
    //   this.models.push(this.leftAr);
    // } else {
    //   this.models.push(this.model);
    // }
    // return this.models;
  }

  setPosition(pos) {
    super.setPosition(pos);
    this.model.position.set(this.X, this.Y, this.Z);
  }
}