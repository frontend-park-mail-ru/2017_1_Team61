/**
 * Created by sergey on 21.04.17.
 */

import { Platform } from './platform';
import { Ball } from './ball';
import { Barrier } from './barrier';
import { Ground } from './ground';
import GameModel from '../../models/gameModel';
import EvenEmitter from '../eventEmitter/eventEmitter';
import UserModel from '../../models/userModel';

const gm = new GameModel();
const ee = new EvenEmitter();
const us = new UserModel();

export default class MultiStrategy {

  constructor() {
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.keyboard2 = new KeyboardState();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(0, 340, 340);
    this.scene.add(this.spotLight);

    this.y = window.innerHeight * 0.6;
    this.x = this.y * 2.1;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.x, this.y);
    document.body.appendChild(this.renderer.domElement);

    this.pos = { x: 0, y: 0, z: 120 };
    this.size = { width: 180, height: 10, depth: 240 };
    this.ground = new Ground(this.pos, this.size);
    this.scene.add(this.ground.getModel());

    this.barriers = [];

    this.pos = { x: -85, y: 10, z: 120 };
    this.size = { width: 10, height: 10, depth: 240 };
    this.angle = Math.PI / 2;
    this.borderLeft = new Barrier(this.pos, this.size, this.angle);
    this.barriers.push(this.borderLeft);
    this.scene.add(this.borderLeft.getModel());

    this.pos = { x: 85, y: 10, z: 120 };
    this.size = { width: 10, height: 10, depth: 240 };
    this.angle = Math.PI / 2;
    this.borderRight = new Barrier(this.pos, this.size, this.angle);
    this.barriers.push(this.borderRight);
    this.scene.add(this.borderRight.getModel());

    this.pos = { x: 0, y: 10, z: 230 };
    this.size = { width: 60, height: 5, depth: 10 };
    this.platformMy = new Platform(0, this.pos, this.size);
    this.scene.add(this.platformMy.getModel());

    this.pos = { x: 0, y: 10, z: 10 };
    this.size = { width: 60, height: 5, depth: 10 };
    this.platformEnemy = new Platform(1, this.pos, this.size);
    this.scene.add(this.platformEnemy.getModel());

    this.pos = { x: 0, y: 10, z: 220 };
    this.radius = 5;
    this.ball = new Ball(0, this.pos, this.radius);
    this.scene.add(this.ball.getModel());

    this.camera.position.x = 0;
    this.camera.position.y = 120;
    this.camera.position.z = 300;
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

        // document.getElementsByClassName('score-player1__score')[0].innerHTML = scoreMy;
       // document.getElementsByClassName('score-player2__score')[0].innerHTML = scoreEnemy;
    this.renderer.render(this.scene, this.camera);
  }

  animationScene() {
    this.render();

    window.requestAnimationFrame(this.animationScene.bind(this));
  }

  control(button) {
    this.controller = 1;
    if (button === 'left') {
      gm.sendButton('left');
    } else if (button === 'right') {
      gm.sendButton('right');
    } else if (button === 'space') {
      gm.sendButton('space');
    }
  }

  setStateGame(state) {
    console.log(us);
    this.state = state;

    if(us.getData().id === this.state.players[0].userId) {
      this.pos = {
        x: this.state.players[0].platform.x,
        y: this.platformMy.getPosition().y,
        z: this.platformMy.getPosition().z
      };
      this.platformMy.setPosition(this.pos);
      this.pos = {
        x: this.state.players[1].platform.x,
        y: this.platformEnemy.getPosition().y,
        z: this.platformEnemy.getPosition().z
      };
      this.platformEnemy.setPosition(this.pos);
      this.pos = {
        x: this.state.ballCoords.x,
        y: this.ball.getPosition().y,
        z: this.state.ballCoords.y
      };
      this.ball.setPosition(this.pos);
    } else {
      this.pos = {
        x: this.state.players[1].platform.x,
        y: this.platformMy.getPosition().y,
        z: this.platformMy.getPosition().z
      };
      this.platformMy.setPosition(this.pos);
      this.pos = {
        x: this.state.players[0].platform.x,
        y: this.platformEnemy.getPosition().y,
        z: this.platformEnemy.getPosition().z
      };
      this.platformEnemy.setPosition(this.pos);
      this.pos = {
        x: this.state.ballCoords.x,
        y: this.ball.getPosition().y,
        z: this.state.ballCoords.y
      };
      this.ball.setPosition(this.pos);
    }
  }


}
