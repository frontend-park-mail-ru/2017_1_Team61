/**
 * Created by tlakatlekutl on 20.02.17.
 */
;(function (){
    'use strict';

    const win_w = document.documentElement.clientWidth-20;
    const win_h = document.documentElement.clientHeight-20;
    const Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies;

// create an engine
    const engine = Engine.create({enableSleeping: false});

// create a renderer
    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: win_w,
            height: win_h,
            background: '#99dc5b',
            showAngleIndicator: false,
            wireframes: false,
            showCollisions: true,
            showVelocity: true
        }
    });
    //Shape params
    const shapeRadius = win_w/30;
    const shapeX = win_w/8;

    //Ground params

    const groundLength = win_w/3.5;
    const groundWidth = win_h/18;
    const groundX = win_w/7;
    const groundY = win_h - win_h/7;

    //Physic params
    const restEnergy = 2;

    //Menus params
    const menuX = win_w*6/10;
    const menuY = win_h*4/10;
    const menuLength = win_h/4;
    const menuHigth = menuLength;

    // World Elements
    const shape = Bodies.circle(shapeX, -100, shapeRadius,
                                { isStatic: false,
                                    restitution: restEnergy});
    const ground = Bodies.rectangle(groundX,
                                    groundY,
                                    groundLength,
                                    groundWidth,
                                    {isStatic: true,
                                        angle: 0.4});

    const menuStatic = true;
    const menu1 = Bodies.rectangle(menuX, menuY, menuLength, menuHigth,
        {isStatic: menuStatic});
    const menu2 = Bodies.rectangle(menuX, menuY+menuHigth, menuLength, menuHigth,
        {isStatic: menuStatic});
    const menu3 = Bodies.rectangle(menuX+menuLength, menuY, menuLength, menuHigth,
        {isStatic: menuStatic});
    const menu4 = Bodies.rectangle(menuX+menuLength, menuY+menuHigth, menuLength, menuHigth,
        {isStatic: menuStatic});


// add all of the bodies to the world
    World.add(engine.world, [shape, ground, menu1, menu2, menu3, menu4]);

// run the engine
    Engine.run(engine);

// run the renderer
    Render.run(render);
})();