// tame the javashrek
'use strict'

// main game object
let config  = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
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
    zoom: 2,
    render: {
        pixelArt: true
    }
}

// create game
let game = new Phaser.Game(config);

// global variables
let centerX = game.config.width / 2
let centerY = game.config.height / 2
let w = game.config.width
let h = game.config.height
let cursors
let keyW, keyA, keyS, keyD