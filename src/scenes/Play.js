class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
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
                    this.scene.restart
                    break
                case 'Backspace':
                    // console.log('credits')
                    this.scene.start('creditsScene')
                    break
                default:
                    break
            }
        })
    }

    update() {

    }
}