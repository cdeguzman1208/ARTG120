class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() { // take care of all of our asset loading for now
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()                              // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1)               // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5)   // (x, y, w, h)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        // sprites
        this.load.path = './assets/art/sprites/'
        this.load.spritesheet('robot', 'robosprite1.1.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('robot2', 'robosprite2.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('robot3', 'robosprite3.png', {
            frameWidth: 64,
            frameHeight: 64
        })
        this.load.spritesheet('rat', 'rat.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.spritesheet('vulture', 'vulture.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.image('bolt', 'bolt.png')
        this.load.image('nut', 'nut.png')
        this.load.image('screw', 'screw.png')
        this.load.image('base', 'workshop1.png')
        this.load.image('base2', 'workshop2.png')
        this.load.image('base3', 'workshop3.png')
        this.load.image('confetti', 'confetti.png')

        // tiles
        this.load.path = './assets/art/tiles/'
        this.load.image('tilesetImage', 'tilesheet.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.tilemapTiledJSON('tilemapJSON', 'junkyard.json')

        // music
        this.load.path = './assets/sound/music/'
        this.load.audio('bgm', 'man-is-he-mega-glbml-22045.mp3')

        // sfx
        this.load.path = './assets/sound/sfx/'
        this.load.audio('select', 'blipSelect.wav')
        this.load.audio('pickup', 'pickupCoin.wav')
        this.load.audio('squeak', 'jump.wav')
        this.load.audio('upgrade', 'powerUp.wav')
        this.load.audio('drop', 'explosion.wav')
        this.load.audio('squawk', 'Palo Verde Terr.mp3')
    }

    create() {
        // console.log('loaded')
        this.scene.start('menuScene')
    }
}