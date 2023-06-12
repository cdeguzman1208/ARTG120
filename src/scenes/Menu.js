class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {
        this.selectSFX = this.sound.add('select')

        // add bgm
        bgm.play()
        
        // set up scene switcher
        this.input.keyboard.on('keydown', (event) => {
            // console.log(event.key);
            switch(event.key) {
                case ' ':
                    // console.log('play')
                    this.selectSFX.play()
                    this.scene.start('playScene')
                    break
                case 'Backspace':
                    // console.log('credits')
                    this.selectSFX.play()
                    this.scene.start('creditsScene')
                    break
                case 't' :
                    this.selectSFX.play()
                    this.scene.start('tutorialScene')
                    break
                default:
                    break
            }
        })

        // add environment
        map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tilesheet', 'tilesetImage')
        const bgLayer = map.createLayer('floor', tileset, 0, 0)
        const trLayer = map.createLayer('terrain', tileset, 0, 0)

        // add logo
        this.logo = this.add.sprite(centerX, centerY - 50, 'builtDiff')

        // add menu text
        let menuConfig = {
            fontFamily: 'Verdana',
            fontSize: '30px',
            color: 'white',
            backgroundColor: 'brown',
            align: 'center',
            padding: {
                top: 8,
                bottom: 8,
                left: 8,
                right: 8
            },
            fixedWidth: 0
        }
        this.add.text(centerX, centerY - 125 - 50, 'B U I L T  D I F F E R E N T', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '18px'
        menuConfig.backgroundColor = ''
        menuConfig.align = 'left'
        this.add.text(centerX - 125, centerY + 150 - 50, 'PLAY (SPACE)\n\nTUTORIAL (T)\n\nCREDITS (BACKSPACE)\n\nMAIN MENU (ESC)', menuConfig).setOrigin(0.5)

    }

    update() {

    }
}