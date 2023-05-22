class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {
        // set up scene switcher
        this.input.keyboard.on('keydown', (event) => {
            switch(event.key) {
                case 'Escape':
                    // console.log('menu')
                    this.scene.restart
                    break
                case ' ':
                    // console.log('play')
                    this.scene.start('playScene')
                    break
                case 'Backspace':
                    // console.log('credits')
                    this.scene.start('creditsScene')
                    break
                default:
                    break
            }
        })
        this.add.text(centerX, centerY, "Press SPACE to play").setOrigin(0.5);
    }

    update() {

    }
}