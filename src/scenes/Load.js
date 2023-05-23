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
        this.load.spritesheet('robot', 'robosprite1.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.image('bolt', 'bolt.png'); 
        this.load.image('nut', 'nut.png'); 
        this.load.image('screw', 'screw.png'); 
        this.load.image('base', 'workshop.png');

        // tiles
        this.load.path = './assets/art/tiles/'
        this.load.image('tilesetImage', 'tilesheet.png', {
            frameWidth: 32,
            frameHeight: 32
        })
        this.load.tilemapTiledJSON('tilemapJSON', 'junkyard.json')

        // music
        this.load.path = './assets/sound/music/'

        // sfx
        this.load.path = './assets/sound/sfx/'
    }

    create() {
        // console.log('loaded')
        this.scene.start('menuScene')
    }
}