class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene')
    }

    create() {
        // set up scene switcher
        this.input.keyboard.on('keydown', (event) => {
            switch(event.key) {
                case 'Escape':
                    // console.log('menu')
                    this.scene.start('menuScene')
                    break
                case ' ':
                    // console.log('play')
                    this.scene.start('playScene')
                    break
                case 'Backspace':
                    // console.log('credits')
                    this.scene.start('creditsScene')
                    break
                case 't' :
                    this.scene.restart()
                default:
                    break
            }
        })

        // add tutorial text
        let tutConfig = {
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
        this.add.text(w/2, h/2 - 175, 'T U T O R I A L', tutConfig).setOrigin(0.5)
        tutConfig.fontSize = '20px'
        tutConfig.backgroundColor = ''
        tutConfig.align = 'left'
        this.add.text(w/2, h/2, '* Use ARROW KEYS to move\n\n* Collect metal scraps throughout the map\n\n* Bring it back to the Workshop to build yourself up\n\n* Be careful! Too much weight will slow you down!\n\n* Press ESC to return to the Main Menu', tutConfig).setOrigin(0.5)
    }
}