/**
 * Created by tlakatlekutl on 04.04.17.
 */

/* global THREE:true */

(function gameFunc() {
  const startGameFunc = () => {
    let time = 0;
    let botActive = false;

    let scoreMy = 0;
    let scoreEnemy = 0;

    const ballDes = {};
    ballDes.r = 0.5;

    const vectorMoveBall = [0, 0, 0];
    const vectorLength = 0.2;
    let flagMoveBall = false;
    let flagOwn = 1;

    const platformMydes = {};
    platformMydes.x = 5;
    platformMydes.y = 1;
    platformMydes.z = 1;
    platformMydes.centerX = 0;
    platformMydes.centerY = 1;
    platformMydes.centerZ = 15;

    const platformEnemydes = {};
    platformEnemydes.x = 5;
    platformEnemydes.y = 1;
    platformEnemydes.z = 1;
    platformEnemydes.centerX = 0;
    platformEnemydes.centerY = 1;
    platformEnemydes.centerZ = 1;

    const borderLeftdes = {};
    borderLeftdes.x = 1;
    borderLeftdes.y = 1;
    borderLeftdes.z = 16;
    borderLeftdes.centerX = -7.5;
    borderLeftdes.centerY = 1;
    borderLeftdes.centerZ = 8;

    const borderRightdes = {};
    borderRightdes.x = 1;
    borderRightdes.y = 1;
    borderRightdes.z = 16;
    borderRightdes.centerX = 7.5;
    borderRightdes.centerY = 1;
    borderRightdes.centerZ = 8;

    const scene = new THREE.Scene();
    const clock = new THREE.Clock();
    const keyboard2 = new KeyboardState();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const x = window.innerWidth * 0.97;
    const y = window.innerHeight * 0.8;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(x, y);
    document.body.appendChild(renderer.domElement);
    const game = [];

    const groundGeometry = new THREE.BoxGeometry(16, 1, 16);
    const groundMaterialArray = [];
    // order to add materials: x+,x-,y+,y-,z+,z-
    groundMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xff3333 }));
    groundMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x007DFF }));
    groundMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xA25F2A }));
    groundMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x33ff33 }));
    groundMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xA6A5E9 }));
    groundMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xA6A5E9 }));
    const groundMaterial = new THREE.MeshFaceMaterial(groundMaterialArray);
    // let groundMaterial = new THREE.MeshNormalMaterial({color: 0x8888ff});
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.set(0, 0, 8);
    scene.add(ground);
    game.push(ground);

    //    let loaderSkyBox = new THREE.TextureLoader();
    //    loaderSkyBox.load(
    //        'images/game2.png',
    //        function ( texture ) {
    //            let geometry = new THREE.BoxGeometry(1000, 1000, 1000);
    //            let material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5, side: THREE.BackSide } );
    //            let mesh = new THREE.Mesh( geometry, material );
    //            mesh.position.set(0, 0, 0);
    //            scene.add( mesh );
    //        }
    //    );

    const skyBoxGeometry = new THREE.BoxGeometry(40, 40, 40);
    const skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0xF5F5F5, side: THREE.BackSide });
    const skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    skyBox.position.set(0, 0, 0);
    scene.add(skyBox);

    const borderLeftGeometry = new THREE.BoxGeometry(1, 1, 16);
    const borderLeftMaterialArray = [];
    // order to add materials: x+,x-,y+,y-,z+,z-
    borderLeftMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x423189 }));
    borderLeftMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x423189 }));
    borderLeftMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xEFA94A }));
    borderLeftMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x33ff33 }));
    borderLeftMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xA6A5E9 }));
    borderLeftMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xA6A5E9 }));
    const borderLeftMaterial = new THREE.MeshFaceMaterial(borderLeftMaterialArray);
    // let borderLeftMaterial = new THREE.MeshNormalMaterial({color: 0x8888ff});
    const borderLeft = new THREE.Mesh(borderLeftGeometry, borderLeftMaterial);
    borderLeft.position.set(-7.5, 1, 8);
    scene.add(borderLeft);
    game.push(borderLeft);

    const borderRightGeometry = new THREE.BoxGeometry(1, 1, 16);
    const borderRightMaterialArray = [];
    // order to add materials: x+,x-,y+,y-,z+,z-
    borderRightMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x423189 }));
    borderRightMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x423189 }));
    borderRightMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xEFA94A }));
    borderRightMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x423189 }));
    borderRightMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xA6A5E9 }));
    borderRightMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xA6A5E9 }));
    const borderRightMaterial = new THREE.MeshFaceMaterial(borderRightMaterialArray);
    // let borderRightMaterial = new THREE.MeshNormalMaterial({color: 0x8888ff});
    const borderRight = new THREE.Mesh(borderRightGeometry, borderRightMaterial);
    borderRight.position.set(7.5, 1, 8);
    scene.add(borderRight);
    game.push(borderRight);

    //    let loaderPlatformMy = new THREE.TextureLoader();
    //    loaderPlatformMy.load(
    //        'images/Game/crate.png',
    //        function ( texture ) {
    //            let geometry = new THREE.BoxGeometry(5, 1, 1);
    //            let material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
    //            let mesh = new THREE.Mesh( geometry, material );
    //            mesh.position.set(0, 1, 15);
    //            scene.add( mesh );
    //        }
    //    );

    const platformMyGeometry = new THREE.BoxGeometry(5, 1, 1);
    const platformMyMaterialArray = [];
    // order to add materials: x+,x-,y+,y-,z+,z-
    platformMyMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xff3333 }));
    platformMyMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xff8800 }));
    platformMyMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x138808 }));
    platformMyMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x33ff33 }));
    platformMyMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x008000 }));
    platformMyMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x8833ff }));
    const platformMyMaterial = new THREE.MeshFaceMaterial(platformMyMaterialArray);
    //    let platformMyMaterial = new THREE.MeshLambertMaterial({emissive: 0x27A54A, shading: THREE.SmoothShading });
    const platformMy = new THREE.Mesh(platformMyGeometry, platformMyMaterial);
    platformMy.position.set(0, 1, 15);
    scene.add(platformMy);
    game.push(platformMy);

    const platformEnemyGeometry = new THREE.BoxGeometry(5, 1, 1);
    const platformEnemyMaterialArray = [];
    // order to add materials: x+,x-,y+,y-,z+,z-
    platformEnemyMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xff3333 }));
    platformEnemyMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xff8800 }));
    platformEnemyMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xFF2400 }));
    platformEnemyMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x33ff33 }));
    platformEnemyMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0xFF0000 }));
    platformEnemyMaterialArray.push(new THREE.MeshBasicMaterial({ color: 0x8833ff }));
    const platformEnemyMaterial = new THREE.MeshFaceMaterial(platformEnemyMaterialArray);
    //    let platformEnemyMaterial = new THREE.MeshLambertMaterial({emissive: 0xBF2E22, shading: THREE.SmoothShading });
    const platformEnemy = new THREE.Mesh(platformEnemyGeometry, platformEnemyMaterial);
    platformEnemy.position.set(0, 1, 1);
    scene.add(platformEnemy);
    game.push(platformEnemy);

    const ballGeometry = new THREE.SphereGeometry(0.5, 20, 20);
    const ballMaterial = new THREE.MeshNormalMaterial({ color: 0xffff00 });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 1, 14);
    scene.add(ball);
    game.push(ball);

    //    let loaderBox = new THREE.TextureLoader();
    //    loaderBox.load(
    //        'images/Crate.jpg',
    //        function ( texture ) {
    //            let geometry = new THREE.BoxGeometry(2, 2, 2);
    //            let material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
    //            let mesh = new THREE.Mesh( geometry, material );
    //            mesh.position.set(0, 3, 3);
    //            scene.add( mesh );
    //        }
    //    );

    const pointViewG = new THREE.SphereGeometry(0, 0, 0);
    const pointViewM = new THREE.MeshNormalMaterial({ color: 0xffff00 });
    const pointView = new THREE.Mesh(pointViewG, pointViewM);
    pointView.position.set(0, -4, 2);
    scene.add(pointView);

    camera.position.x = 0;
    camera.position.y = 12;
    camera.position.z = 22;
    camera.lookAt(ground.position);
    // let controls = new THREE.OrbitControls( camera, renderer.domElement );

    const render = function () {
      //   controls.update();
      time++;
      requestAnimationFrame(render);

      keyboard2.update();
//        let moveDistance = 50 * clock.getDelta();

      if (keyboard2.pressed('left')) {
        if (platformMy.position.x - platformMydes.x / 2 > borderLeft.position.x + borderLeftdes.x / 2) {
          platformMy.translateX(-0.2);
          if (flagMoveBall === false && flagOwn === 1) {
            if (ball.position.x >= platformMy.position.x + platformMydes.x / 2) {
              ball.translateX(-0.2);
            }
          }
        }
      }

      if (keyboard2.pressed('right')) {
        if (platformMy.position.x + platformMydes.x / 2 < borderRight.position.x - borderRightdes.x / 2) {
          platformMy.translateX(0.2);
          if (flagMoveBall === false && flagOwn === 1) {
            if (ball.position.x <= platformMy.position.x - platformMydes.x / 2) {
              ball.translateX(0.2);
            }
          }
        }
      }

      if (keyboard2.pressed('A')) {
        if (platformEnemy.position.x - platformEnemydes.x / 2 > borderLeft.position.x + borderLeftdes.x / 2) {
          platformEnemy.translateX(-0.2);
          if (flagMoveBall === false && flagOwn === 2) {
            if (ball.position.x >= platformEnemy.position.x + platformEnemydes.x / 2) {
              ball.translateX(-0.2);
            }
          }
        }
      }

      if (keyboard2.pressed('D')) {
        if (platformEnemy.position.x + platformEnemydes.x / 2 < borderRight.position.x - borderRightdes.x / 2) {
          platformEnemy.translateX(0.2);
          if (flagMoveBall === false && flagOwn === 2) {
            if (ball.position.x <= platformEnemy.position.x - platformEnemydes.x / 2) {
              ball.translateX(0.2);
            }
          }
        }
      }

      if (keyboard2.down('B')) {
        if(botActive === true) {
            botActive = false;
        } else {
            botActive = true;
        }
      }

      if (keyboard2.down('space')) {
        if (flagMoveBall === false) {
          flagMoveBall = true;
          vectorMoveBall[0] = (ball.position.x - platformMy.position.x) / 13;
          vectorMoveBall[1] = 0;
          vectorMoveBall[2] = -((vectorLength ** 2 - vectorMoveBall[0] ** 2) ** 0.5);
          time = 0;
        }
      }

      if (flagMoveBall === true) {
        ballCollision();
        if(botActive === true) {
          if(platformEnemy.position.x - ball.position.x > 0.2) {
              if (platformEnemy.position.x - platformEnemydes.x / 2 > borderLeft.position.x + borderLeftdes.x / 2) {
                  platformEnemy.translateX(-0.2);
              }
          } else if (platformEnemy.position.x - ball.position.x < -0.2) {
              if (platformEnemy.position.x + platformEnemydes.x / 2 < borderRight.position.x - borderRightdes.x / 2) {
                  platformEnemy.translateX(0.2);
              }
          }
        }
      }

      ball.translateX(vectorMoveBall[0]);
      ball.translateY(vectorMoveBall[1]);
      ball.translateZ(vectorMoveBall[2]);

      document.getElementsByClassName('score-player1__score')[0].innerHTML = scoreMy;
      document.getElementsByClassName('score-player2__score')[0].innerHTML = scoreEnemy;
      renderer.render(scene, camera);
    };

    render();

    function ballCollision() {
      if (ball.position.x >= platformMy.position.x - platformMydes.x / 2 &&
        ball.position.x <= platformMy.position.x + platformMydes.x / 2 &&
        ball.position.z + ballDes.r >= platformMy.position.z - platformMydes.z / 2) {
        vectorMoveBall[0] = (ball.position.x - platformMy.position.x) / 13;
        vectorMoveBall[1] = 0;
        vectorMoveBall[2] = -((vectorLength ** 2 - vectorMoveBall[0] ** 2) ** 0.5);
        for (let i = 0; i < time / 400; i++) {
          vectorMoveBall[0] *= 1.1;
          vectorMoveBall[2] *= 1.1;
        }
      } else if (ball.position.x >= platformEnemy.position.x - platformEnemydes.x / 2 &&
        ball.position.x <= platformEnemy.position.x + platformEnemydes.x / 2 &&
        ball.position.z - ballDes.r <= platformEnemy.position.z + platformEnemydes.z / 2) {
        vectorMoveBall[0] = (ball.position.x - platformEnemy.position.x) / 13;
        vectorMoveBall[1] = 0;
        vectorMoveBall[2] = ((vectorLength ** 2 - vectorMoveBall[0] ** 2) ** 0.5);
        for (let i = 0; i < time / 400; i++) {
          vectorMoveBall[0] *= 1.1;
          vectorMoveBall[2] *= 1.1;
        }
      } else if (ball.position.x - ballDes.r <= borderLeft.position.x + borderLeftdes.x / 2) {
        ball.position.x = borderLeft.position.x + borderLeftdes.x / 2 + ballDes.r;
        vectorMoveBall[0] = -vectorMoveBall[0];
      } else if (ball.position.x + ballDes.r >= borderRight.position.x - borderRightdes.x / 2) {
        ball.position.x = borderRight.position.x - borderRightdes.x / 2 - ballDes.r;
        vectorMoveBall[0] = -vectorMoveBall[0];
      }

      if (ball.position.z > platformMy.position.z) {
        flagMoveBall = false;
        flagOwn = 1;
        ball.position.set(0, 1, 14);
        platformMy.position.set(0, 1, 15);
        vectorMoveBall[0] = 0;
        vectorMoveBall[1] = 0;
        vectorMoveBall[2] = 0;
        scoreEnemy += 10;
        time = 0;
      } else if (ball.position.z < platformEnemy.position.z) {
        flagMoveBall = false;
        flagOwn = 2;
        ball.position.set(0, 1, 2);
        platformEnemy.position.set(0, 1, 1);
        vectorMoveBall[0] = 0;
        vectorMoveBall[1] = 0;
        vectorMoveBall[2] = 0;
        scoreMy += 10;
        time = 0;
      }
    }
  };
  this.startGameFunc = startGameFunc;
}());
