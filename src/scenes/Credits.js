class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
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
                case 'Backspace':
                    // console.log('credits')
                    this.selectSFX.play()
                    this.scene.restart
                    break
                default:
                    break
            }
        })

        this.add.text(centerX, centerY, 'credits');

        // production
        // cromwell de guzman

        // design
        // david amaya
        // cromwell de guzman
        // emma lapolt

        // programming
        // david amaya
        // beatrice yu
        // cromwell de guzman

        // writing
        // david amaya
        // cromwell de guzman

        // art
        // emma lapolt

        // audio
        // cromwell de guzman
        // gabriel hong
    }

    update() {

    }
}