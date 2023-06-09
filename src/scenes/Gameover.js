class Gameover extends Phaser.Scene {
    constructor() {
        super('gameoverScene')
    }

    create() {
        // select sound
        this.selectSFX = this.sound.add('select')

        // text config 
        let goConfig = {
            fontFamily: 'Verdana',
            fontSize: '30px',
            color: 'white',
            align: 'center',
            padding: {
                top: 8,
                bottom: 8,
                left: 8,
                right: 8
            },
            fixedWidth: 0
        }

        // set up particle emitter
        let line = new Phaser.Geom.Line(0, 0, w, 0);
        this.lineEmitter = this.add.particles(0, 0, 'confetti', {
            gravityY: 300,
            lifespan: 2000,
            tint: [ Math.random() * 0xFFFFFF, Math.random() * 0xFFFFFF, Math.random() * 0xFFFFFF, Math.random() * 0xFFFFFF, Math.random() * 0xFFFFFF ],
            emitZone: { 
                type: 'random', 
                source: line, 
                quantity: 500 
            },
            blendMode: 'ADD',
        });

        // add text 
        this.time.delayedCall(2000, () => {
            this.add.text(centerX, 200, 'C O N G R A T U L A T I O N S !', goConfig).setOrigin(0.5);
            this.add.text(centerX, 250, 'YOU\'RE BUILT DIFFERENT', goConfig).setOrigin(0.5); 
            this.time.delayedCall(1000, () => {
                goConfig.fontSize = '20px';
                this.add.text(centerX, 450, '(ESC) for main menu || (BACKSPACE) for credits', goConfig).setOrigin(0.5); 
            })
        })

        // input 
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyBACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.selectSFX.play();
            this.scene.start('menuScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyBACK)) {
            this.selectSFX.play();
            this.scene.start('creditsScene'); 
        }
    }
}