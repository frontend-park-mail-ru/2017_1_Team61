/**
 * Created by sergey on 15.04.17.
 */

import { Platform } from './platform';
import { Ball } from './ball';
import { Barrier } from './barrier';
import { Ground } from './ground';

class SingleStrategy {

  constructor() {
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.keyboard2 = new KeyboardState();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(0, 40, 40);
    this.scene.add(this.spotLight);

    this.x = window.innerWidth * 0.97;
    this.y = window.innerHeight * 0.8;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.x, this.y);
    document.body.appendChild(this.renderer.domElement);

    this.pos = { x: 0, y: 0, z: 8 };
    this.size = { width: 16, height: 1, depth: 16 };
    this.ground = new Ground(this.pos, this.size);
    this.scene.add(this.ground.getModel());

    this.barriers = [];

    this.pos = { x: -7.5, y: 1, z: 8 };
    this.size = { width: 1, height: 1, depth: 16 };
    this.angle = Math.PI / 2;
    this.borderLeft = new Barrier(this.pos, this.size, this.angle);
    this.barriers.push(this.borderLeft);
    this.scene.add(this.borderLeft.getModel());

    this.pos = { x: 7.5, y: 1, z: 8 };
    this.size = { width: 1, height: 1, depth: 16 };
    this.angle = Math.PI / 2;
    this.borderRight = new Barrier(this.pos, this.size, this.angle);
    this.barriers.push(this.borderRight);
    this.scene.add(this.borderRight.getModel());

    this.pos = { x: 0, y: 1, z: 15 };
    this.size = { width: 5, height: 1, depth: 1 };
    this.platformMy = new Platform(0, this.pos, this.size);
    this.scene.add(this.platformMy.getModel());

    this.pos = { x: 0, y: 1, z: 1 };
    this.size = { width: 5, height: 1, depth: 1 };
    this.platformEnemy = new Platform(1, this.pos, this.size);
    this.scene.add(this.platformEnemy.getModel());

    this.pos = { x: 0, y: 1, z: 14 };
    this.radius = 0.5;
    this.ball = new Ball(0, this.pos, this.radius);
    this.scene.add(this.ball.getModel());


    this.pointViewG = new THREE.SphereGeometry(0, 0, 0);
    this.pointViewM = new THREE.MeshNormalMaterial({ color: 0xffff00 });
    this.pointView = new THREE.Mesh(this.pointViewG, this.pointViewM);
    this.pointView.position.set(0, -4, 2);
    this.scene.add(this.pointView);

    this.camera.position.x = 0;
    this.camera.position.y = 12;
    this.camera.position.z = 22;
    this.camera.lookAt(this.ground.getPosition());
  }

  render() {
    this.keyboard2.update();

    if (this.keyboard2.pressed('left')) {
      this.control('left');
    }

    if (this.keyboard2.pressed('right')) {
      this.control('right');
    }

    if (this.keyboard2.down('space')) {
      this.control('space');
    }

    this.checkMove();

    this.renderer.render(this.scene, this.camera);
  }

  animationScene() {
    this.render();

    window.requestAnimationFrame(this.animationScene.bind(this));
  }

  control(button) {
    if (button === 'left') {
      if (this.platformMy.getPosition().x - this.platformMy.getSize().width / 2 >
                this.borderLeft.getPosition().x + this.borderLeft.getSize().width / 2) {
        this.pos = {
          x: this.platformMy.getPosition().x - 0.2,
          y: this.platformMy.getPosition().y,
          z: this.platformMy.getPosition().z,
        };
        this.platformMy.setPosition(this.pos);
        if (this.ball.getMove() === false) {
          if (this.ball.getPosition().x > this.platformMy.getPosition().x + this.platformMy.getSize().width / 2) {
            this.pos = {
              x: this.platformMy.getPosition().x + this.platformMy.getSize().width / 2,
              y: this.ball.getPosition().y,
              z: this.ball.getPosition().z,
            };
            this.ball.setPosition(this.pos);
          }
        }
      }
    } else if (button === 'right') {
      if (this.platformMy.getPosition().x + this.platformMy.getSize().width / 2 <
                this.borderRight.getPosition().x - this.borderRight.getSize().width / 2) {
        this.pos = {
          x: this.platformMy.getPosition().x + 0.2,
          y: this.platformMy.getPosition().y,
          z: this.platformMy.getPosition().z,
        };
        this.platformMy.setPosition(this.pos);
        if (this.ball.getMove() === false) {
          if (this.ball.getPosition().x < this.platformMy.getPosition().x - this.platformMy.getSize().width / 2) {
            this.pos = {
              x: this.platformMy.getPosition().x - this.platformMy.getSize().width / 2,
              y: this.ball.getPosition().y,
              z: this.ball.getPosition().z,
            };
            this.ball.setPosition(this.pos);
          }
        }
      }
    } else if (button === 'space') {
      if (this.ball.getMove() === false) {
        this.ball.setMove(true);
                // this.vectorLength = 0.2;
        this.vector = { x: 0, y: 0, z: 0 };
        this.vector.x = (this.ball.getPosition().x - this.platformMy.getPosition().x) / 13;
        this.vector.y = 0;
        this.vector.z = -(this.platformMy.getPosition().z + 2 - this.ball.getPosition().z) / 13;
        this.ball.setVectorMove(this.vector);
      }
    }
  }

  checkMove() {
    if (this.ball.getMove() === true) {
      this.pos = {
        x: this.ball.getPosition().x + this.ball.getVectorMove().x,
        y: this.ball.getPosition().y + this.ball.getVectorMove().y,
        z: this.ball.getPosition().z + this.ball.getVectorMove().z,
      };
      this.ball.setPosition(this.pos);
    }
  }


}

const Game = new SingleStrategy();

Game.animationScene();

