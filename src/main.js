// tame the javashrek
'use strict'

// main game object
let config  = {
    type: Phaser.CANVAS,
    width: 480,
    height: 480,
    zoom: 2,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        }
    },
    scene: [ Load, Menu, Play, Credits ],
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    render: {
        pixelArt: true
    },
}

// create game
let game = new Phaser.Game(config)

// global variables
let centerX = game.config.width / 2
let centerY = game.config.height / 2
let w = game.config.width
let h = game.config.height
let resourceCount; 
let cursors
let keyW, keyA, keyS, keyD
let map

// evolution tracking
let stage = 0;
const max_scraps_robot = [5, 10, 15];
const max_scraps_base = [15, 35, 50];