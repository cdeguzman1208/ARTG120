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

        // text config 
        let creditsConfig = {
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
        let cj = 'Cromwell De Guzman', bebus = 'Beatrice Yu', david = 'David Amaya', emma = 'Emma LaPolt'

        this.creditsText = this.add.text(centerX, h, 'C R E D I T S', creditsConfig).setOrigin(0.5)

        creditsConfig.fontSize = '20px'

        // production
        // cromwell de guzman
        this.productionText = this.add.text(centerX, h + 50, 'P R O D U C T I O N', creditsConfig).setOrigin(0.5)
        this.producerText = this.add.text(centerX, h + 100, cj, creditsConfig).setOrigin(0.5)

        // design
        // david amaya
        // cromwell de guzman
        // emma lapolt
        this.designText = this.add.text(centerX, h + 150, 'D E S I G N', creditsConfig).setOrigin(0.5)
        this.designer1Text = this.add.text(centerX, h + 200, david, creditsConfig).setOrigin(0.5)
        this.designer2Text = this.add.text(centerX, h + 250, cj, creditsConfig).setOrigin(0.5)
        this.designer3Text = this.add.text(centerX, h + 300, emma, creditsConfig).setOrigin(0.5)

        // programming
        // david amaya
        // beatrice yu
        // cromwell de guzman
        this.programmingText = this.add.text(centerX, h + 350, 'P R O G R A M M I N G', creditsConfig).setOrigin(0.5)
        this.programmer1Text = this.add.text(centerX, h + 400, david, creditsConfig).setOrigin(0.5)
        this.programmer2Text = this.add.text(centerX, h + 450, bebus, creditsConfig).setOrigin(0.5)
        this.programmer3Text = this.add.text(centerX, h + 500, cj, creditsConfig).setOrigin(0.5)

        // writing
        // david amaya
        // cromwell de guzman
        this.writingText = this.add.text(centerX, h + 550, 'W R I T I N G', creditsConfig).setOrigin(0.5)
        this.writer1Text = this.add.text(centerX, h + 600, david, creditsConfig).setOrigin(0.5)
        this.writer2Text = this.add.text(centerX, h + 650, cj, creditsConfig).setOrigin(0.5)

        // art
        // emma lapolt
        this.artText = this.add.text(centerX, h + 700, 'A R T', creditsConfig).setOrigin(0.5)
        this.artistText = this.add.text(centerX, h + 750, emma, creditsConfig).setOrigin(0.5)

        // audio
        // cromwell de guzman
        // gabriel hong
        this.audioText = this.add.text(centerX, h + 800, 'A U D I O', creditsConfig).setOrigin(0.5)
        this.sound1Text = this.add.text(centerX, h + 850, cj, creditsConfig).setOrigin(0.5)
        this.sound2Text = this.add.text(centerX, h + 900, 'Gabriel Hong', creditsConfig).setOrigin(0.5)
    }

    update() {
        if(this.sound2Text.y > -50) {
            this.creditsText.y--
            this.productionText.y--
            this.producerText.y--
            this.designText.y--
            this.designer1Text.y--
            this.designer2Text.y--
            this.designer3Text.y--
            this.programmingText.y--
            this.programmer1Text.y--
            this.programmer2Text.y--
            this.programmer3Text.y--
            this.writingText.y--
            this.writer1Text.y--
            this.writer2Text.y--
            this.artText.y--
            this.artistText.y--
            this.audioText.y--
            this.sound1Text.y--
            this.sound2Text.y--
        }
        else {
            this.scene.restart()
        }
    }
}