class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene')
    }

    create() {
        this.selectSFX = this.sound.add('select')

        // set up scene switcher
        this.input.keyboard.on('keydown', (event) => {
            switch(event.key) {
                case 'Escape':
                    // console.log('menu')
                    bgm.stop()
                    this.selectSFX.play()
                    this.scene.start('menuScene')
                    break
                default:
                    break
            }
        })

        // tutorial background
        this.blue = this.add.rectangle(0, 0, 640, 480, 0x800000).setOrigin(0)

        // add tutorial text
        let tutConfig = {
            fontFamily: 'Verdana',
            fontSize: '30px',
            color: '#D2B48C',
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
        let bulletPoints1 = '* Use ARROW KEYS to move\n\n* Collect metal scraps\n\n* Bring it back to the Workshop to build yourself up\n\n* Be careful! Too much weight will slow you down!\n\n* Press SPACE to drop excess trash\n\n'
        let bulletPoints2 = '* Dirty rats will try to steal your metal scraps\n\n* Stomp on them to steal it back!\n\n* Pesky vultures will cause you to lose all of your scraps\n\n* Avoid them at all costs!\n\n* Press ESC to return to the Main Menu'
        let rightNext = 'Press → to go Next'
        let leftBack = 'Press ← to go Back'
        let tutorialText = this.add.text(w/2, h/2 + 25, bulletPoints1, tutConfig).setOrigin(0.5)
        let arrowSwitch = this.add.text(w/2, h - 50, rightNext, tutConfig).setOrigin(0.5)
        this.input.keyboard.on('keydown', (event) => {
            // console.log(event.key)
            if(event.key == 'ArrowRight') {
                this.selectSFX.play()
                tutorialText.setText(bulletPoints2)
                arrowSwitch.setText(leftBack)
            }
            else if(event.key == 'ArrowLeft') {
                this.selectSFX.play()
                tutorialText.setText(bulletPoints1)
                arrowSwitch.setText(rightNext)
            }
        })
    }
}