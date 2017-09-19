/**
 * Created by sergey on 15.04.17.
 */

import { Platform } from './platform';
import { Ball } from './ball';
import { Barrier } from './barrier';
import { Ground } from './ground';
import { Bot } from './bot';
import { Bonus } from './bonus';
import Player from './player';
import * as THREE from 'three';
import UserModel from '../../models/userModel';

const us = new UserModel();

export default class SingleStrategy {

  constructor() {
    this.platformChange = 1.5;
    this.extraBall = false;
    this.time = (new Date()).getTime();
    this.lastBonus = 0;
    this.playTime = 0;
    this.play = true;

    if (us.getData().nickname === undefined) {
      this.player1 = new Player('Гость', 0, 0);
    } else {
      this.player1 = new Player(us.getData().nickname, 0, us.getData().rating);
    }
    this.player2 = new Player('Умный бот', 0, 777);

    this.nick1 = document.querySelector('.player1 .player_nickname');
    this.nick1.innerHTML = this.player1.getNickname();
    this.nick2 = document.querySelector('.player2 .player_nickname');
    this.nick2.innerHTML = this.player2.getNickname();
    this.rat1 = document.querySelector('.player1 .player_rating_score');
    this.rat1.innerHTML = this.player1.getRating();
    this.rat2 = document.querySelector('.player2 .player_rating_score');
    this.rat2.innerHTML = this.player2.getRating();
    this.score1 = document.querySelector('.player1_score');
    this.score1.innerHTML = this.player1.getScore();
    this.score2 = document.querySelector('.player2_score');
    this.score2.innerHTML = this.player2.getScore();

    this.scene = new THREE.Scene();
    this.keyboard2 = new KeyboardState();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(0, 350, 340);
    this.spotLight.shadowMapWidth = 1920;
    this.spotLight.shadowMapHeight = 1080;
    this.spotLight.shadow.camera.near = 0.5;       // default
    this.spotLight.shadow.camera.far = 1000;      // default
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);

    this.x = window.innerWidth * 0.95;
    this.y = window.innerHeight * 0.8;

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 0); // the default
    this.renderer.setSize(this.x, this.y);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    document.body.appendChild(this.renderer.domElement);

    this.pos = { x: 0, y: 0, z: 0 };
    this.size = { width: 180, height: 10, depth: 240 };
    this.ground = new Ground(this.pos, this.size);
    this.scene.add(this.ground.getModel());

    this.barriers = [];

    this.pos = { x: -85, y: 10, z: 0 };
    this.size = { width: 10, height: 10, depth: 240 };
    this.angle = Math.PI / 2;
    this.borderLeft = new Barrier(this.pos, this.size, this.angle, 'BORDER');
    this.barriers.push(this.borderLeft);
    this.scene.add(this.borderLeft.getModel());

    this.pos = { x: 85, y: 10, z: 0 };
    this.size = { width: 10, height: 10, depth: 240 };
    this.angle = Math.PI / 2;
    this.borderRight = new Barrier(this.pos, this.size, this.angle, 'BORDER');
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

    this.pos = { x: 0, y: 10, z: 117.5 };
    this.size = { width: 160, height: 10, depth: 5 };
    this.angle = 0;
    this.shieldMy = new Barrier(this.pos, this.size, this.angle, 'SHIELD');
    this.scene.add(this.shieldMy.getModel());

    this.pos = { x: 0, y: 10, z: -117.5 };
    this.size = { width: 160, height: 10, depth: 5 };
    this.angle = 0;
    this.shieldEnemy = new Barrier(this.pos, this.size, this.angle, 'SHIELD');
    this.scene.add(this.shieldEnemy.getModel());

    this.balls = [];

    this.pos = { x: 0, y: 10, z: 0 };
    this.radius = 5;
    this.ball = new Ball(0, this.pos, this.radius);
    this.scene.add(this.ball.getModel());

    this.balls[0] = this.ball;

    this.camera.position.x = 0;
    this.camera.position.y = 120;
    this.camera.position.z = 180;
    this.camera.lookAt(this.ground.getPosition());

    this.bonuses = [];

    this.bot = new Bot(this.platformEnemy.getPosition());

    this.addEventListeners();

    // this.pos = { x: 0, y: 1, z: 14 };
    // this.radius = 0.5;
    // this.ball = new Ball(0, this.pos, this.radius);
    // this.scene.add(this.ball.getModel());
    //
    // this.pointViewG = new THREE.SphereGeometry(0, 0, 0);
    // this.pointViewM = new THREE.MeshNormalMaterial({ color: 0xffff00 });
    // this.pointView = new THREE.Mesh(this.pointViewG, this.pointViewM);
    // this.pointView.position.set(0, -4, 2);
    // this.scene.add(this.pointView);
    //
    // this.camera.position.x = 0;
    // this.camera.position.y = 8;
    // this.camera.position.z = 20;
    // this.look = this.ground.getPosition();
    // this.look.y -= 3;
    // this.camera.lookAt(this.look);
    //
    // this.addEventListeners();
  }

  render() {
    this.x = window.innerWidth * 0.95;
    this.y = window.innerHeight * 0.8;

    this.renderer.setSize(this.x, this.y);
    this.keyboard2.update();

    if (this.keyboard2.pressed('left')) {
      this.control('left');
    }

    if (this.keyboard2.pressed('right')) {
      this.control('right');
    }

    if (this.touchCheck === 1) {
      const canvas = document.querySelector('canvas');
      if (this.touch.changedTouches[0].clientX < canvas.getBoundingClientRect().left +
        (canvas.getBoundingClientRect().width / 2)) {
        this.control('left');
      } else {
        this.control('right');
      }
    }
    this.gameProcess();

    this.renderer.render(this.scene, this.camera);
  }

  addEventListeners() {
    const canvas = document.querySelector('canvas');
    canvas.addEventListener('touchstart', (event) => {
      event.preventDefault();
      this.touch = event;
      this.touchCheck = 1;
    });
    canvas.addEventListener('touchend', () => {
      this.touchCheck = 0;
    });
  }

  animationScene() {
    this.render();

    if (this.play === true) {
      window.requestAnimationFrame(this.animationScene.bind(this));
    }
  }

  gameProcess() {
    if (this.balls.length === 0 || this.extraBall === true) {
      this.pos = { x: 0, y: 10, z: 0 };
      this.radius = 5;
      this.ball = new Ball(0, this.pos, this.radius);
      this.scene.add(this.ball.getModel());
      this.balls.push(this.ball);
      this.extraBall = false;
    }

    for (let i = 0; i < this.balls.length; i += 1) {
      if (this.balls[i].getMove() === false) {
        let k1 = Math.random();
        let k2 = Math.random();
        const ang = (Math.random() * (this.balls[i].getSpeed() - 0.5)) + 0.5;
        if (k1 > 0.5) {
          k1 = -1;
        } else {
          k1 = 1;
        }
        if (k2 > 0.5) {
          k2 = -1;
        } else {
          k2 = 1;
        }
        this.vector = {
          x: (((this.balls[i].getSpeed() ** 2) - (ang ** 2)) ** 0.5) * k2,
          y: 0,
          z: ang * k1,
        };
        this.balls[i].setVectorMove(this.vector);
        this.balls[i].setMove(true);
      }
      this.balls[i].moveUpVector();
    }

    this.checkBallBarrier();
    this.botAction();

    this.playTime = (new Date()).getTime() - this.time;

    this.checkBonus();
    this.checkEffect();

    for (let i = 0; i < this.balls.length; i += 1) {
      this.balls[i].increaseSpeed();
    }

    this.score1 = document.querySelector('.player1_score');
    this.score1.innerHTML = this.player1.getScore();
    this.score2 = document.querySelector('.player2_score');
    this.score2.innerHTML = this.player2.getScore();
  }

  control(button) {
    if (button === 'left') {
      if (this.platformMy.getPosition().x - (this.platformMy.getSize().width / 2) >
        this.borderLeft.getPosition().x + (this.borderLeft.getSize().width / 2)) {
        this.pos = {
          x: this.platformMy.getPosition().x - 2,
          y: this.platformMy.getPosition().y,
          z: this.platformMy.getPosition().z,
        };
        this.platformMy.moveSingle(this.pos);
      }
    } else if (button === 'right') {
      if (this.platformMy.getPosition().x + (this.platformMy.getSize().width / 2) <
        this.borderRight.getPosition().x - (this.borderRight.getSize().width / 2)) {
        this.pos = {
          x: this.platformMy.getPosition().x + 2,
          y: this.platformMy.getPosition().y,
          z: this.platformMy.getPosition().z,
        };
        this.platformMy.moveSingle(this.pos);
      }
    }
  }

  checkBonus() {
    for (let i = 0; i < this.bonuses.length; i += 1) {
      if (this.bonuses[i].checkTime() === true) {
        this.scene.remove(this.bonuses[i].getPivot());
        this.bonuses.splice(i, 1);
      }
    }

    if (this.playTime - this.lastBonus > 10000) {
      const bon = Math.round((Math.random() * 5) + 1);
      let type = '';
      if (bon === 1) {
        type = 'PLATFORM_INCREASE';
      } else if (bon === 2) {
        type = 'PLATFORM_DECREASE';
      } else if (bon === 3) {
        type = 'BALL_MULTIPLY';
      } else if (bon === 4) {
        type = 'SHIELD';
      } else if (bon === 5) {
        type = 'BALL_INCREASE';
      } else {
        type = 'BALL_DECREASE';
      }

      this.pos = {
        x: (Math.random() * (this.ground.getSize().width - 60)) -
        ((this.ground.getSize().width - 60) / 2),
        y: 15,
        z: (Math.random() * (this.ground.getSize().depth - 80)) -
        ((this.ground.getSize().depth - 80) / 2),
      };
      this.radius = 10;
      this.bonus = new Bonus(type, this.pos, this.radius);
      this.scene.add(this.bonus.getPivot());
      this.bonuses.push(this.bonus);
      this.lastBonus = this.playTime;
    }

    for (let i = 0; i < this.bonuses.length; i += 1) {
      for (let j = 0; j < this.balls.length && this.bonuses.length > 0; j += 1) {
        if ((((this.balls[j].getPosition().x - this.bonuses[i].getPosition().x) ** 2) +
          ((this.balls[j].getPosition().z - this.bonuses[i].getPosition().z) ** 2)) ** 0.5
          < this.bonuses[i].getSize()) {
          if (this.bonuses[i].getType() === 'PLATFORM_INCREASE' || this.bonuses[i].getType() === 'PLATFORM_DECREASE') {
            if (this.balls[j].getSide() === 0) {
              this.scene.remove(this.platformMy.getModel());
              let newWidth = this.platformMy.getSize().width * this.platformChange;
              if (this.bonuses[i].getType() === 'PLATFORM_DECREASE') {
                newWidth = this.platformMy.getSize().width / this.platformChange;
              }
              this.size = {
                width: newWidth,
                height: this.platformMy.getSize().height,
              };
              this.platformMy.setSize(this.size);
              this.platformMy.setEffect();
              this.scene.add(this.platformMy.getModel());
              this.platformMy.moveSingle(this.platformMy.getPosition());
            } else {
              this.scene.remove(this.platformEnemy.getModel());
              let newWidth = this.platformEnemy.getSize().width * this.platformChange;
              if (this.bonuses[i].getType() === 'PLATFORM_DECREASE') {
                newWidth = this.platformEnemy.getSize().width / this.platformChange;
              }
              this.size = {
                width: newWidth,
                height: this.platformEnemy.getSize().height,
              };
              this.platformEnemy.setSize(this.size);
              this.platformEnemy.setEffect();
              this.scene.add(this.platformEnemy.getModel());
              this.platformEnemy.moveSingle(this.platformEnemy.getPosition());
            }
          } else if (this.bonuses[i].getType() === 'BALL_MULTIPLY') {
            this.extraBall = true;
          } else if (this.bonuses[i].getType() === 'SHIELD') {
            if (this.balls[j].getSide() === 0) {
              this.player1.setShield(true);
            } else {
              this.player2.setShield(true);
            }
          } else {
            let newRadius = this.balls[j].getSize() * 2;
            if (this.bonuses[i].getType() === 'BALL_DECREASE') {
              newRadius = this.balls[j].getSize() / 2;
            }
            this.scene.remove(this.balls[j].getModel());
            this.balls[j].setSize(newRadius);
            this.balls[j].setEffect();
            this.scene.add(this.balls[j].getModel());
          }
          this.scene.remove(this.bonuses[i].getPivot());
          this.bonuses.splice(i, 1);
        }
      }
    }

    for (let i = 0; i < this.bonuses.length; i += 1) {
      this.bonuses[i].animation();
    }
  }

  checkEffect() {
    if (this.platformMy.getPosition().x - (this.platformMy.getSize().width / 2) <
      this.borderLeft.getPosition().x + (this.borderLeft.getSize().width / 2)) {
      this.pos = {
        x: this.borderLeft.getPosition().x + (this.borderLeft.getSize().width / 2) +
        (this.platformMy.getSize().width / 2),
        y: this.platformMy.getPosition().y,
        z: this.platformMy.getPosition().z,
      };
      this.platformMy.moveSingle(this.pos);
    }
    if (this.platformMy.getPosition().x + (this.platformMy.getSize().width / 2) >
      this.borderRight.getPosition().x + (this.borderRight.getSize().width / 2)) {
      this.pos = {
        x: this.borderRight.getPosition().x - (this.borderRight.getSize().width / 2) -
        (this.platformMy.getSize().width / 2),
        y: this.platformMy.getPosition().y,
        z: this.platformMy.getPosition().z,
      };
      this.platformMy.moveSingle(this.pos);
    }
    if (this.platformEnemy.getPosition().x - (this.platformEnemy.getSize().width / 2) <
      this.borderLeft.getPosition().x + (this.borderLeft.getSize().width / 2)) {
      this.pos = {
        x: this.borderLeft.getPosition().x + (this.borderLeft.getSize().width / 2) +
        (this.platformEnemy.getSize().width / 2),
        y: this.platformEnemy.getPosition().y,
        z: this.platformEnemy.getPosition().z,
      };
      this.platformEnemy.moveSingle(this.pos);
    }
    if (this.platformEnemy.getPosition().x + (this.platformEnemy.getSize().width / 2) >
      this.borderRight.getPosition().x + (this.borderRight.getSize().width / 2)) {
      this.pos = {
        x: this.borderRight.getPosition().x - (this.borderRight.getSize().width / 2) -
        (this.platformEnemy.getSize().width / 2),
        y: this.platformEnemy.getPosition().y,
        z: this.platformEnemy.getPosition().z,
      };
      this.platformEnemy.moveSingle(this.pos);
    }
    if (this.platformMy.checkEffect() === false &&
      this.platformMy.getSize().width !== this.platformMy.getBaseWidth()) {
      this.scene.remove(this.platformMy.getModel());
      this.size = {
        width: this.platformMy.getBaseWidth(),
        height: this.platformMy.getSize().height,
      };
      this.platformMy.setSize(this.size);
      this.scene.add(this.platformMy.getModel());
      this.platformMy.moveSingle(this.platformMy.getPosition());
    }
    if (this.platformEnemy.checkEffect() === false &&
      this.platformEnemy.getSize().width !== this.platformEnemy.getBaseWidth()) {
      this.scene.remove(this.platformEnemy.getModel());
      this.size = {
        width: this.platformEnemy.getBaseWidth(),
        height: this.platformEnemy.getSize().height,
      };
      this.platformEnemy.setSize(this.size);
      this.scene.add(this.platformEnemy.getModel());
      this.platformEnemy.moveSingle(this.platformEnemy.getPosition());
    }
    for (let i = 0; i < this.balls.length; i += 1) {
      if (this.balls[i].checkEffect() === false &&
        this.balls[i].getSize() !== this.balls[i].getBaseSize()) {
        this.scene.remove(this.balls[i].getModel());
        this.balls[i].setSize(this.balls[i].getBaseSize());
        this.scene.add(this.balls[i].getModel());
      }
    }
  }

  botAction() {
    if (this.balls.length > 0) {
      let numNear = 0;
      let distNear = Math.abs(this.balls[0].getPosition().z);
      for (let i = 1; i < this.balls.length; i += 1) {
        if (Math.abs(this.balls[i].getPosition().z) < distNear) {
          numNear = i;
          distNear = Math.abs(this.balls[i].getPosition().z);
        }
      }

      this.enemyMove = this.bot.getBehavior(this.balls[numNear].getPosition());
      this.pos = {
        x: this.platformEnemy.getPosition().x + this.enemyMove.xd,
        y: this.platformEnemy.getPosition().y + this.enemyMove.yd,
        z: this.platformEnemy.getPosition().z + this.enemyMove.zd,
      };
      if (this.enemyMove.xd > 0 && this.pos.x + (this.platformEnemy.getSize().width / 2) <
        this.borderRight.getPosition().x - (this.borderRight.getSize().width / 2)) {
        this.platformEnemy.moveSingle(this.pos);
        this.bot.setPosition(this.platformEnemy.getPosition());
      } else if (this.enemyMove.xd < 0 && this.pos.x - (this.platformEnemy.getSize().width / 2) >
        this.borderLeft.getPosition().x + (this.borderLeft.getSize().width / 2)) {
        this.platformEnemy.moveSingle(this.pos);
        this.bot.setPosition(this.platformEnemy.getPosition());
      }
    }
  }

  checkBallBarrier() {
    for (let i = 0; i < this.balls.length; i += 1) {
      this.vector = {
        x: this.balls[i].getVectorMove().x,
        y: 0,
        z: this.balls[i].getVectorMove().z,
      };
      if (this.balls[i].getPosition().x - this.balls[i].getSize() <=
        this.borderLeft.getPosition().x + (this.borderLeft.getSize().width / 2)) {
        this.vector.x = -this.vector.x;
        this.balls[i].setVectorMove(this.vector);
        this.pos = {
          x: this.borderLeft.getPosition().x + (this.borderLeft.getSize().width / 2) +
          this.balls[i].getSize(),
          y: this.balls[i].getPosition().y,
          z: this.balls[i].getPosition().z,
        };
        this.balls[i].setPosition(this.pos);
      }
      if (this.balls[i].getPosition().x + this.balls[i].getSize() >=
        this.borderRight.getPosition().x - (this.borderRight.getSize().width / 2)) {
        this.vector.x = -this.vector.x;
        this.balls[i].setVectorMove(this.vector);
        this.pos = {
          x: this.borderRight.getPosition().x - (this.borderRight.getSize().width / 2) -
          this.balls[i].getSize(),
          y: this.balls[i].getPosition().y,
          z: this.balls[i].getPosition().z,
        };
        this.balls[i].setPosition(this.pos);
      }

      if (this.balls[i].getPosition().x >= this.platformMy.getPosition().x -
        (this.platformMy.getSize().width / 2) && this.balls[i].getPosition().x <=
        this.platformMy.getPosition().x + (this.platformMy.getSize().width / 2) &&
        this.balls[i].getPosition().z + this.balls[i].getSize() >=
        this.platformMy.getPosition().z - (this.platformMy.getSize().depth / 2)) {
        this.vector = {
          x: 0,
          y: 0,
          z: -this.balls[i].getSpeed(),
        };
        const ang = Math.atan(Math.abs(this.balls[i].getPosition().x -
            this.platformMy.getPosition().x) / (this.platformMy.getSize().width / 1.5));
        this.vector.x = (this.vector.x * Math.cos(ang)) - (this.vector.z * Math.sin(ang));
        this.vector.z = (this.vector.x * Math.sin(ang)) + (this.vector.z * Math.cos(ang));
        if (this.balls[i].getPosition().x < this.platformMy.getPosition().x) {
          this.vector.x = -this.vector.x;
        }
        this.balls[i].setVectorMove(this.vector);
        this.pos = {
          x: this.balls[i].getPosition().x,
          y: this.balls[i].getPosition().y,
          z: this.platformMy.getPosition().z - (this.platformMy.getSize().depth / 2) -
          this.balls[i].getSize(),
        };
        this.balls[i].setPosition(this.pos);
        this.balls[i].setSide(0);
      }
      if (this.balls[i].getPosition().x >= this.platformEnemy.getPosition().x -
        (this.platformEnemy.getSize().width / 2) && this.balls[i].getPosition().x <=
        this.platformEnemy.getPosition().x + (this.platformEnemy.getSize().width / 2) &&
        this.balls[i].getPosition().z - this.balls[i].getSize() <=
        this.platformEnemy.getPosition().z + (this.platformEnemy.getSize().depth / 2)) {
        this.vector = {
          x: 0,
          y: 0,
          z: this.balls[i].getSpeed(),
        };
        const ang = Math.atan(Math.abs(this.balls[i].getPosition().x -
            this.platformEnemy.getPosition().x) / (this.platformEnemy.getSize().width / 1.5));
        this.vector.x = (this.vector.x * Math.cos(ang)) - (this.vector.z * Math.sin(ang));
        this.vector.z = (this.vector.x * Math.sin(ang)) + (this.vector.z * Math.cos(ang));
        if (this.balls[i].getPosition().x > this.platformEnemy.getPosition().x) {
          this.vector.x = -this.vector.x;
        }
        this.balls[i].setVectorMove(this.vector);
        this.pos = {
          x: this.balls[i].getPosition().x,
          y: this.balls[i].getPosition().y,
          z: this.platformEnemy.getPosition().z + (this.platformEnemy.getSize().depth / 2) +
          this.balls[i].getSize(),
        };
        this.balls[i].setPosition(this.pos);
        this.balls[i].setSide(1);
      }

      this.vector = {
        x: this.balls[i].getVectorMove().x,
        y: 0,
        z: this.balls[i].getVectorMove().z,
      };

      if (this.player1.checkShield() === true) {
        if (this.balls[i].getPosition().z + this.balls[i].getSize() >=
          this.shieldMy.getPosition().z - (this.shieldMy.getSize().depth / 2)) {
          this.vector.z = -this.vector.z;
          this.balls[i].setVectorMove(this.vector);
          this.pos = {
            x: this.balls[i].getPosition().x,
            y: this.balls[i].getPosition().y,
            z: this.shieldMy.getPosition().z - (this.shieldMy.getSize().depth / 2) -
            this.balls[i].getSize(),
          };
          this.balls[i].setPosition(this.pos);
          this.player1.setShield(false);
        }
      }
      if (this.player2.checkShield() === true) {
        if (this.balls[i].getPosition().z - this.balls[i].getSize() <=
          this.shieldEnemy.getPosition().z + (this.shieldEnemy.getSize().depth / 2)) {
          this.vector.z = -this.vector.z;
          this.balls[i].setVectorMove(this.vector);
          this.pos = {
            x: this.balls[i].getPosition().x,
            y: this.balls[i].getPosition().y,
            z: this.shieldEnemy.getPosition().z + (this.shieldEnemy.getSize().depth / 2) +
            this.balls[i].getSize(),
          };
          this.balls[i].setPosition(this.pos);
          this.player2.setShield(false);
        }
      }

      if (this.balls[i].getPosition().z < -(this.ground.getSize().depth / 2)) {
        this.player1.setScore(this.player1.getScore() + 1);
        this.scene.remove(this.balls[i].getModel());
        this.balls.splice(i, 1);
      } else if (this.balls[i].getPosition().z > this.ground.getSize().depth / 2) {
        this.player2.setScore(this.player2.getScore() + 1);
        this.scene.remove(this.balls[i].getModel());
        this.balls.splice(i, 1);
      }
    }

    if (this.player1.checkShield() === true) {
      this.scene.add(this.shieldMy.getModel());
    } else {
      this.scene.remove(this.shieldMy.getModel());
    }

    if (this.player2.checkShield() === true) {
      this.scene.add(this.shieldEnemy.getModel());
    } else {
      this.scene.remove(this.shieldEnemy.getModel());
    }
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
