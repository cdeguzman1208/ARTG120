class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
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
                    this.scene.restart
                    break
                default:
                    break
            }
        })
    }

    update() {

    }
}