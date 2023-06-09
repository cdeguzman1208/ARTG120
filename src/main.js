// tame the javashrek
'use strict'

// main game object
let config  = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    zoom: 1.25,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        }
    },
    scene: [ Load, Menu, Play, Credits, Tutorial, Gameover ],
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
let resourceCount
let ratCount = 0
let cursors
let keyW, keyA, keyS, keyD, keyESC, keyBACK, keyG
let map
let bgm

// evolution tracking
let stage = 0;
const max_scraps_robot = [10, 15, 20]   // tweak as necessary
// 20,45,60
const max_scraps_base = [20, 45, 60]   // tweak as necessary

// gameover scene switching
const SCENE_TRANSITION_TIME = 3000