class Play extends Phaser.Scene {
    constructor() {
        super('playScene')

        this.VEL = 200
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

        // add environment
        const map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tileset', 'tilesetImage')
        const bgLayer = map.createLayer('Background', tileset, 0, 0)
        const terrainLayer = map.createLayer('Terrain', tileset, 0, 0)
        const treeLayer = map.createLayer('Trees', tileset, 0, 0).setDepth(200)

        // add player
        this.robot = this.physics.add.sprite(32, 32, 'robot', 0)
        this.anims.create({
            key: 'walk',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('robot', {
                start: 0,
                end: 1
            })
        })
        this.robot.play('walk')

        // enable collision
        this.robot.body.setCollideWorldBounds(true)
        terrainLayer.setCollisionByProperty({ collides: true })
        treeLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(this.robot, terrainLayer)
        this.physics.add.collider(this.robot, treeLayer)

        // cameras
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.robot, true, 0.25, 0.25)
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels)

        // input
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // player movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown) {
            this.robot.rotation = Math.PI / 2
            this.direction.x = -1
        } else if(this.cursors.right.isDown) {
            this.robot.rotation = Math.PI * 3 / 2
            this.direction.x = 1
        }
        if(this.cursors.up.isDown) {
            this.robot.rotation = Math.PI
            this.direction.y = -1
        } else if(this.cursors.down.isDown) {
            this.robot.rotation = 0
            this.direction.y = 1
        }
        this.direction.normalize()
        this.robot.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
    }
}