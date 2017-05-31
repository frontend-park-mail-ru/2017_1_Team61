/**
 * Created by sergey on 21.04.17.
 */
import * as THREE from 'three';
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

    this.play = false;
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
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(0, 340, 340);
    this.scene.add(this.spotLight);

    this.x = window.innerWidth * 0.95;
    this.y = window.innerHeight * 0.8;

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 0);
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

    // this.pos = { x: 0, y: 10, z: 112.5 };
    // this.size = { width: 60, height: 5, depth: 15 };
    // this.platformMyFant = new Platform(0, this.pos, this.size);
    // this.scene.add(this.platformMyFant.getModel());

    this.pos = { x: 0, y: 10, z: -112.5 };
    this.size = { width: 60, height: 5, depth: 15 };
    this.platformEnemy = new Platform(1, this.pos, this.size);
    this.scene.add(this.platformEnemy.getModel());

    this.pos = { x: 0, y: 10, z: 120 };
    this.size = { width: 160, height: 10, depth: 5 };
    this.angle = 0;
    this.shieldMy = new Barrier(this.pos, this.size, this.angle, 'SHIELD');
    this.scene.add(this.shieldMy.getModel());

    this.pos = { x: 0, y: 10, z: -120 };
    this.size = { width: 160, height: 10, depth: 5 };
    this.angle = 0;
    this.shieldEnemy = new Barrier(this.pos, this.size, this.angle, 'SHIELD');
    this.scene.add(this.shieldEnemy.getModel());

    // this.geometry = new THREE.SphereGeometry(5, 32, 32, 0, Math.PI);
    // this.material = new THREE.MeshLambertMaterial({ color: 0x1D870D });
    // this.sphere = new THREE.Mesh(this.geometry, this.material);
    // this.sphere.position.set(0, 60, 112.5);
    // this.scene.add(this.sphere);
    // this.x = 0;
    // this.y = 40;
    // this.heartShape = new THREE.Shape();
    //
    // this.heartShape.moveTo(this.x + 5, this.y + 5);
    // // this.heartShape.moveTo(this.x + 10, this.y + 5);
    // // this.heartShape.moveTo(this.x + 10, this.y + 10);
    // // this.heartShape.moveTo(this.x + 5, this.y + 10);
    //
    //
    // this.heartShape.bezierCurveTo(this.x + 5, this.y + 5, this.x + 4, this.y, this.x, this.y);
    // this.heartShape.bezierCurveTo(this.x - 6, this.y, this.x - 6, this.y + 7,this.x - 6, this.y + 7);
    // this.heartShape.bezierCurveTo(this.x - 6, this.y + 11, this.x - 3, this.y + 15.4, this.x + 5, this.y + 19);
    // this.heartShape.bezierCurveTo(this.x + 12, this.y + 15.4, this.x + 16, this.y + 11, this.x + 16, this.y + 7);
    // this.heartShape.bezierCurveTo(this.x + 16, this.y + 7, this.x + 16, this.y, this.x + 10, this.y);
    // this.heartShape.bezierCurveTo(this.x + 7, this.y, this.x + 5, this.y + 5, this.x + 5, this.y + 5);
    //
    // this.geometry = new THREE.ShapeGeometry(this.heartShape);
    // this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(this.mesh);

    // const rightArrow = [];
    // rightArrow.push(new THREE.Vector2(0, 30));
    // rightArrow.push(new THREE.Vector2(0, 35));
    // rightArrow.push(new THREE.Vector2(7.5, 35));
    // rightArrow.push(new THREE.Vector2(7.5, 37.5));
    // rightArrow.push(new THREE.Vector2(10, 32.5));
    // rightArrow.push(new THREE.Vector2(7.5, 27.5));
    // rightArrow.push(new THREE.Vector2(7.5, 30));
    //
    // const rightArrowShape = new THREE.Shape(rightArrow);
    // const extrusionSettings = {
    //   amount: 5, curveSegments: 3,
    //   bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
    //   material: 0, extrudeMaterial: 1
    // };
    //
    // const rightArrowGeometry = new THREE.ExtrudeGeometry(rightArrowShape, extrusionSettings);
    // const materialFrontR = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // const materialSideR = new THREE.MeshBasicMaterial({ color: 0xff8800 });
    // const materialArrayR = [materialFrontR, materialSideR];
    // const rightArrowMaterial = new THREE.MeshFaceMaterial(materialArrayR);
    //
    // this.rightAr = new THREE.Mesh(rightArrowGeometry, rightArrowMaterial);
    // this.rightAr.position.set(0, 50, 0);
    // this.scene.add(this.rightAr);
    //
    // const leftArrow = [];
    // leftArrow.push(new THREE.Vector2(-2.5, 30));
    // leftArrow.push(new THREE.Vector2(-2.5, 35));
    // leftArrow.push(new THREE.Vector2(-10, 35));
    // leftArrow.push(new THREE.Vector2(-10, 37.5));
    // leftArrow.push(new THREE.Vector2(-12.5, 32.5));
    // leftArrow.push(new THREE.Vector2(-10, 27.5));
    // leftArrow.push(new THREE.Vector2(-10, 30));
    //
    // const leftArrowShape = new THREE.Shape(leftArrow);
    //
    // const leftArrowGeometry = new THREE.ExtrudeGeometry(leftArrowShape, extrusionSettings);
    // const materialFrontL = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // const materialSideL = new THREE.MeshBasicMaterial({ color: 0xff8800 });
    // const materialArrayL = [materialFrontL, materialSideL];
    // const leftArrowMaterial = new THREE.MeshFaceMaterial(materialArrayL);
    //
    // this.leftAr = new THREE.Mesh(leftArrowGeometry, leftArrowMaterial);
    // this.leftAr.position.set(0, 50, 0);
    // this.leftAr.add();
    // this.scene.add(this.leftAr);

    // const x1 = 0;
    // const y1 = 0;
    //
    // this.pivotPoint2 = new THREE.Object3D();
    // this.pivotPoint2.position.set(20, 15, 20);
    //
    // const rightArrow = [];
    // rightArrow.push(new THREE.Vector2(x1, y1));
    // rightArrow.push(new THREE.Vector2(x1, y1 + 5));
    // rightArrow.push(new THREE.Vector2(x1 + 7.5, y1 + 5));
    // rightArrow.push(new THREE.Vector2(x1 + 7.5, y1 + 7.5));
    // rightArrow.push(new THREE.Vector2(x1 + 10, y1 + 2.5));
    // rightArrow.push(new THREE.Vector2(x1 + 7.5, y1 - 2.5));
    // rightArrow.push(new THREE.Vector2(x1 + 7.5, y1));
    //
    // const rightArrowShape = new THREE.Shape(rightArrow);
    // const extrusionSettings = {
    //   amount: 5, curveSegments: 3,
    //   bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
    //   material: 0, extrudeMaterial: 1
    // };
    //
    // const rightArrowGeometry = new THREE.ExtrudeGeometry(rightArrowShape, extrusionSettings);
    // this.Material = new THREE.MeshLambertMaterial({ color: 0x4FFF18 });
    // this.rightAr = new THREE.Mesh(rightArrowGeometry, this.Material);
    // this.pivotPoint2.add(this.rightAr);
    // this.rightAr.position.set(0, 0, 0);
    // this.scene.add(this.pivotPoint2);

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

    this.x = window.innerWidth * 0.95;
    this.y = window.innerHeight * 0.8;

    this.renderer.setSize(this.x, this.y);

    if (this.play === true) {
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

      this.platformMy.interpolation();
      this.platformEnemy.interpolation();

      for (let i = 0; i < this.bonuses.length; i += 1) {
        this.bonuses[i].animation();
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
    if (button === 'left') {
      let platformSpeed = 0.05 * this.coordsTransform * this.del;
      this.platformMy.move(platformSpeed);
      this.gm.sendButton('left', this.del);
    } else if (button === 'right') {
      let platformSpeed = -0.05 * this.coordsTransform * this.del;
      this.platformMy.move(platformSpeed);
      this.gm.sendButton('right', this.del);
    }
  }

  setStateGame(state, time) {
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
    for (let i = 0; i < this.countBalls; i += 1) {
      this.pos = {
        x: this.state.balls[i].x * this.coordsTransform,
        y: this.balls[0].getPosition().y,
        z: this.state.balls[i].y * this.coordsTransform,
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
      this.player1.setShield(this.state.players[0].shield);
      this.player2.setShield(this.state.players[1].shield);
      if (this.state.players[0].width !== this.platformMy.getSize().width) {
        this.scene.remove(this.platformMy.getModel());
        this.size = { width: this.state.players[0].width, height: this.platformMy.getSize().height };
        this.platformMy.setSize(this.size);
        this.scene.add(this.platformMy.getModel());
      }
      if (this.state.players[1].width !== this.platformEnemy.getSize().width) {
        this.scene.remove(this.platformEnemy.getModel());
        this.size = { width: this.state.players[1].width, height: this.platformEnemy.getSize().height };
        this.platformEnemy.setSize(this.size);
        this.scene.add(this.platformEnemy.getModel());
      }
    } else {
      this.player1.setScore(this.state.players[1].score);
      this.player2.setScore(this.state.players[0].score);
      this.player1.setShield(this.state.players[1].shield);
      this.player2.setShield(this.state.players[0].shield);
      if (this.state.players[1].width !== this.platformMy.getSize().width) {
        this.scene.remove(this.platformMy.getModel());
        this.size = { width: this.state.players[1].width, height: this.platformMy.getSize().height };
        this.platformMy.setSize(this.size);
        this.scene.add(this.platformMy.getModel());
      }
      if (this.state.players[0].width !== this.platformEnemy.getSize().width) {
        this.scene.remove(this.platformEnemy.getModel());
        this.size = { width: this.state.players[0].width, height: this.platformEnemy.getSize().height };
        this.platformEnemy.setSize(this.size);
        this.scene.add(this.platformEnemy.getModel());
      }
    }

    for (let i = this.state.balls.length; i < this.countBalls; i += 1) {
      this.scene.remove(this.balls[i].getModel());
      this.countBalls -= 1;
    }

    for (let i = 0; i < this.state.balls.length; i += 1) {
      if (this.countBalls === i) {
        this.pos = {
          x: this.state.balls[i].x * this.coordsTransform,
          y: this.balls[0].getPosition().y,
          z: this.state.balls[i].y * this.coordsTransform,
        };
        this.radius = this.state.balls[i].radius;
        this.ball = new Ball(0, this.pos, this.radius);
        this.scene.add(this.ball.getModel());
        this.balls[this.countBalls] = this.ball;
        this.balls[i].setPosition(this.pos);
        this.countBalls += 1;
      }
    }

    for (let i = 0; i < this.countBalls; i += 1) {
      this.pos = {
        x: this.state.balls[i].x * this.coordsTransform,
        y: this.balls[i].getPosition().y,
        z: this.state.balls[i].y * this.coordsTransform,
      };
      this.balls[i].setPosition(this.pos);
      if (this.state.balls[i].radius !== this.balls[i].getSize()) {
        this.scene.remove(this.balls[i].getModel());
        this.balls[i].setSize(this.state.balls[i].radius);
        this.scene.add(this.balls[i].getModel());
      }
    }

    let bonusesLoc = [];

    for (let i = 0; i < this.bonuses.length; i += 1) {
      let check = 0;
      for (let j = 0; j < this.state.bonuses.length; j += 1) {
        if (this.bonuses[i].getType() === this.state.bonuses[j].type) {
          check = 1;
          bonusesLoc.push(this.bonuses[i]);
        }
      }
      if (check === 0) {
        this.scene.remove(this.bonuses[i].getPivot());
      }
    }

    this.bonuses = [];

    for (let i = 0; i < bonusesLoc.length; i += 1) {
      this.bonuses.push(bonusesLoc[i]);
    }

    for (let i = 0; i < this.state.bonuses.length; i += 1) {
      console.log(this.state.bonuses[i].type);
      let check = 0;
      for (let j = 0; j < this.bonuses.length; j += 1) {
        if (this.bonuses[j].getType() === this.state.bonuses[i].type) {
          check = 1;
        }
      }
      if (check === 0) {
        this.pos = {
          x: this.state.bonuses[i].coords.x * this.coordsTransform,
          y: 15,
          z: this.state.bonuses[i].coords.y * this.coordsTransform,
        };
        this.radius = 10;
        this.bonus = new Bonus(this.state.bonuses[i].type, this.pos, this.radius);
        this.scene.add(this.bonus.getPivot());
        // this.scene.add(this.bonus.getModel());
        // for (let j = 0; j < this.bonus.getModel().length; j += 1) {
        //   this.scene.add(this.bonus.getModel()[j]);
        // }
        this.bonuses.push(this.bonus);
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

    this.score1 = document.querySelector('.player1_score');
    this.score1.innerHTML = this.player1.getScore();
    this.score2 = document.querySelector('.player2_score');
    this.score2.innerHTML = this.player2.getScore();
  }

  setOpponent(state) {
    console.log(state);
    this.play = true;
    this.state = state;
    this.coordsTransform = this.state.coordsTransform;
    this.player2 = new Player(this.state.opponentLogin, 0, this.state.opponentRating);
    this.nick2 = document.querySelector('.player2 .player_nickname');
    this.nick2.innerHTML = this.player2.getNickname();
    this.rat2 = document.querySelector('.player2 .player_rating_score');
    this.rat2.innerHTML = this.player2.getRating();
    this.score2 = document.querySelector('.player2_score');
    this.score2.innerHTML = this.player2.getScore();
    this.keyboard2 = new KeyboardState();
    this.animationScene();
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
