/**
 * Created by sergey on 21.04.17.
 */

import { Platform } from './platform';
import { Ball } from './ball';
import { Barrier } from './barrier';
import { Ground } from './ground';
import { Bonus } from './bonus';
import GameModel from '../../models/gameModel';
import EvenEmitter from '../eventEmitter/eventEmitter';
import UserModel from '../../models/userModel';
import Player from './player';

const ee = new EvenEmitter();
const us = new UserModel();

export default class MultiStrategy {

  constructor() {

    this.gm = new GameModel();

    this.play = true;
    this.time = (new Date).getTime();

    this.timepr = 0;
    this.time_st = 0;
    this.timen = 0;
    this.speed = 0;
    this.dist = 0;

    this.pres = 0;
    this.timeLast = (new Date).getTime();

    this.player1 = new Player(us.getData().nickname, 0, us.getData().rating);

    this.nick1 = document.querySelector('.player1 .player_nickname');
    this.nick1.innerHTML = this.player1.getNickname();
    this.rat1 = document.querySelector('.player1 .player_rating_score');
    this.rat1.innerHTML = this.player1.getRating();

    this.score1 = document.querySelector('.player1_score');
    this.score1.innerHTML = this.player1.getScore();

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.keyboard2 = new KeyboardState();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(0, 340, 340);
    this.scene.add(this.spotLight);

    this.x = window.innerWidth * 0.8;
    this.y = this.x * 0.56;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.x, this.y);
    document.body.appendChild(this.renderer.domElement);

    this.pos = { x: 0, y: 0, z: 0 };
    this.size = { width: 180, height: 10, depth: 240 };
    this.ground = new Ground(this.pos, this.size);
    this.scene.add(this.ground.getModel());

    this.barriers = [];

    this.pos = { x: -85, y: 10, z: 0 };
    this.size = { width: 10, height: 10, depth: 240 };
    this.angle = Math.PI / 2;
    this.borderLeft = new Barrier(this.pos, this.size, this.angle);
    this.barriers.push(this.borderLeft);
    this.scene.add(this.borderLeft.getModel());

    this.pos = { x: 85, y: 10, z: 0 };
    this.size = { width: 10, height: 10, depth: 240 };
    this.angle = Math.PI / 2;
    this.borderRight = new Barrier(this.pos, this.size, this.angle);
    this.barriers.push(this.borderRight);
    this.scene.add(this.borderRight.getModel());

    this.pos = { x: 0, y: 10, z: 112.5 };
    this.size = { width: 60, height: 5, depth: 15 };
    this.platformMy = new Platform(0, this.pos, this.size);
    this.scene.add(this.platformMy.getModel());

    this.pos = { x: 0, y: 10, z: -112.5 };
    this.size = { width: 60, height: 5, depth: 15 };
    this.platformEnemy = new Platform(1, this.pos, this.size);
    this.scene.add(this.platformEnemy.getModel());

    this.balls = [];
    this.countBalls = 0;

    this.pos = { x: 0, y: 10, z: 100 };
    this.radius = 5;
    this.ball = new Ball(0, this.pos, this.radius);
    this.scene.add(this.ball.getModel());

    this.balls[this.countBalls] = this.ball;
    this.countBalls += 1;

    this.camera.position.x = 0;
    this.camera.position.y = 120;
    this.camera.position.z = 180;
    this.camera.lookAt(this.ground.getPosition());

    this.bonuses = [];

    this.addEventListeners();
  }

  render() {
    this.keyboard2.update();

    this.pres = 0;

    if (this.keyboard2.pressed('left')) {
      if (this.coordsTransform === -1) {
        this.control('left');
      } else {
        this.control('right');
      }
    }

    if (this.keyboard2.pressed('right')) {
      if (this.coordsTransform === -1) {
        this.control('right');
      } else {
        this.control('left');
      }
    }

    if (this.touchCheck === 1) {
      const canvas = document.querySelector('canvas');
      if (this.touch.changedTouches[0].clientX < canvas.getBoundingClientRect().left + canvas.getBoundingClientRect().width / 2) {
        if (this.coordsTransform === -1) {
          this.control('left');
        } else {
          this.control('right');
        }
      } else {
        if (this.coordsTransform === -1) {
          this.control('right');
        } else {
          this.control('left');
        }
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  addEventListeners() {
    const canvas = document.querySelector('canvas');
    canvas.addEventListener('touchstart', (event) => {
      event.preventDefault();
      this.touch = event;
      this.touchCheck = 1;
    });
    canvas.addEventListener('touchend', (event) => {
      this.touchCheck = 0;
    });
  }

  animationScene() {
    this.render();
    // console.log(this.time - (new Date).getTime());
    this.time = (new Date).getTime();

    if (this.play === true) {
      window.requestAnimationFrame(this.animationScene.bind(this));
    }
  }

  control(button) {
    if (this.pres === 0) {
      this.pres = 1;
      this.del = 20;
    } else {
      this.time = (new Date).getTime();
      this.del = this.time - this.timeLast;
    }
    this.timeLast = (new Date).getTime();
    if (this.del > 100) {
      this.del = 20;
    }
    if (button === 'left') {
      this.gm.sendButton('left', this.del);
    } else if (button === 'right') {
      this.gm.sendButton('right', this.del);
    }
  }

  setStateGame(state, time) {
    // console.log(state);
    this.state = state;

    if (this.time_st === 0) {
      this.timen = time;
      this.time_st = 1;
    } else {
      this.timepr = this.timen;
      this.timen = time;
    }
    //console.log(this.timen - this.timepr);

    if (us.getData().id === this.state.players[0].userId) {
      // this.dist = this.platformMy.getPosition().x - this.state.players[0].platform.x * this.coordsTransform;
      this.pos = {
        x: this.state.players[0].coords.x * this.coordsTransform,
        y: this.platformMy.getPosition().y,
        z: this.platformMy.getPosition().z
      };
      this.platformMy.setPosition(this.pos);
      this.pos = {
        x: this.state.players[1].coords.x * this.coordsTransform,
        y: this.platformEnemy.getPosition().y,
        z: this.platformEnemy.getPosition().z
      };
      this.platformEnemy.setPosition(this.pos);
    } else {
      this.pos = {
        x: this.state.players[1].coords.x * this.coordsTransform,
        y: this.platformMy.getPosition().y,
        z: this.platformMy.getPosition().z
      };
      this.platformMy.setPosition(this.pos);
      this.pos = {
        x: this.state.players[0].coords.x * this.coordsTransform,
        y: this.platformEnemy.getPosition().y,
        z: this.platformEnemy.getPosition().z
      };
      this.platformEnemy.setPosition(this.pos);
    }
    for (let i = 0; i < this.countBalls; i++) {
      this.pos = {
        x: this.state.balls[i].x * this.coordsTransform,
        y: this.ball.getPosition().y,
        z: this.state.balls[i].y * this.coordsTransform
      };
      this.balls[i].setPosition(this.pos);
    }
  }

  setChangeGame(state) {
    console.log(state);
    this.state = state;
    if (us.getData().id === this.state.players[0].userId) {
      this.player1.setScore(this.state.players[0].score);
      this.player2.setScore(this.state.players[1].score);
      if (this.state.players[0].width !== this.platformMy.getSize().width) {
        this.size = {};
        this.size.width = this.state.players[0].width;
        this.size.height = this.platformMy.getSize().height;
        this.platformMy.setSize(this.size);
      }
      if (this.state.players[1].width !== this.platformEnemy.getSize().width) {
        this.size = {};
        this.size.width = this.state.players[1].width;
        this.size.height = this.platformEnemy.getSize().height;
        this.platformEnemy.setSize(this.size);
      }
    } else {
      this.player1.setScore(this.state.players[1].score);
      this.player2.setScore(this.state.players[0].score);
      if (this.state.players[1].width !== this.platformMy.getSize().width) {
        this.size = {};
        this.size.width = this.state.players[1].width;
        this.size.height = this.platformMy.getSize().height;
        this.platformMy.setSize(this.size);
      }
      if (this.state.players[0].width !== this.platformEnemy.getSize().width) {
        this.size = {};
        this.size.width = this.state.players[0].width;
        this.size.height = this.platformEnemy.getSize().height;
        this.platformEnemy.setSize(this.size);
      }
    }

    for (let i = 0; i < this.countBalls; i += 1) {
      this.pos = {
        x: this.state.balls[i].x * this.coordsTransform,
        y: this.ball.getPosition().y,
        z: this.state.balls[i].y * this.coordsTransform,
      };
      this.balls[i].setPosition(this.pos);
      if (this.state.balls[i].radius !== this.balls[i].getSize()) {
        this.size = this.state.balls[i].radius;
        this.balls[i].setSize(this.size);
      }
    }

    for (let i = 0; i < this.state.bonuses.length; i += 1) {
      this.pos = { x: this.state.bonuses[i].coords.x, y: 15, z: this.state.bonuses[i].coords.y };
      this.radius = 5;
      this.bonus = new Bonus(this.state.bonuses[i].type, this.pos, this.radius);
      this.scene.add(this.bonus.getModel());
      this.bonuses[i] = this.bonus;
    }

    this.score1 = document.querySelector('.player1_score');
    this.score1.innerHTML = this.player1.getScore();
    this.score2 = document.querySelector('.player2_score');
    this.score2.innerHTML = this.player2.getScore();

    //console.log(this.state.bonuses);
  }

  setOpponent(state) {
    console.log(state);
    this.state = state;
    this.coordsTransform = this.state.coordsTransform;
    this.player2 = new Player(this.state.opponentLogin, 0, this.state.opponentRating);
    this.nick2 = document.querySelector('.player2 .player_nickname');
    this.nick2.innerHTML = this.player2.getNickname();
    this.rat2 = document.querySelector('.player2 .player_rating_score');
    this.rat2.innerHTML = this.player2.getRating();
    this.score2 = document.querySelector('.player2_score');
    this.score2.innerHTML = this.player2.getScore();
  }

  stop() {
    this.play = false;
    this.keyboard2.destroy();
  }

  resume() {
    this.play = true;
    this.keyboard2 = new KeyboardState();
  }
}
