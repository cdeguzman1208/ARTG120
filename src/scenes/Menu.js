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

        // add menu text
        let menuConfig = {
            fontFamily: 'Verdana',
            fontSize: '30px',
            color: 'white',
            backgroundColor: 'black',
            align: 'center',
            padding: {
                top: 8,
                bottom: 8,
                left: 8,
                right: 8
            },
            fixedWidth: 0
        }
        this.add.text(w/2, h/2 - 100, 'B U I L T  D I F F E R E N T', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '20px'
        menuConfig.backgroundColor = ''
        menuConfig.align = 'left'
        this.add.text(w/2 - 83, h/2 + 75, 'PLAY (SPACE)\n\nTUTORIAL (T)\n\nCREDITS (BACKSPACE)\n\nMAIN MENU (ESC)', menuConfig).setOrigin(0.5)

    }

    update() {

    }
}