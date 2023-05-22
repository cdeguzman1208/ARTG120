class Play extends Phaser.Scene {
    constructor() {
        super('playScene')

        this.VEL = 200
    }

    create() {

        resourceCount = 0; 

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

        // add base
        this.base = new Workshop(this, centerX + 10, centerY, 'base');

        // add player
        this.robot = new Player(this, 32, 32, 'robot')
        this.anims.create({
            key: 'walk',
            frameRate: 4,
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

        // set up resource group 
        this.resourceGroup = this.add.group({
            runChildUpdate: true
        });
        this.addResource(); 

        // display collected resources
        this.resourceText = this.add.text(20, 20, `Scrap x${this.robot.nScrap}`).setScrollFactor(0);

        // robot-resource overlap check
        this.physics.add.overlap(this.robot, this.resourceGroup, (robot,resource) => {
            resource.destroy();
            robot.collect();
            this.resourceText.text = `Scrap x${this.robot.nScrap}`
        }, null, this)

        // robot-workshop overlap check
        this.physics.add.overlap(this.robot, this.base, 
            (robot,base) => {
            // let remainingSpace = max_scraps_base[stage] - base.nScrap;
            // if(remainingSpace < )
            while(robot.nScrap > 0 && base.nScrap < max_scraps_base[stage]){
                robot.nScrap--;
                base.nScrap++;
            }
            this.resourceText.text = `Scrap x${this.robot.nScrap}`;
            base.scrapText.text = `${base.nScrap}/${max_scraps_base[stage]}`;
        }, null, this);
        // (robot, base) => {null, this
        //     // only execute if robot is not empty and base is not full
        //     if(robot.nScrap > 0 && base.nScrap < max_scraps_base[stage]){
        //         return true;
        //     }
        //     return false;
        // }, this);


        // input
        this.cursors = this.input.keyboard.createCursorKeys()
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    addResource() {
        // console.log('resource')
        let resource = new Resource(this);
        this.resourceGroup.add(resource); 
    }

    update() {
        // player movement
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown || Phaser.Input.Keyboard.DownDuration(keyA)) {
            this.robot.rotation = this.robot.body.angle; 
            this.direction.x = -1
        } else if(this.cursors.right.isDown || Phaser.Input.Keyboard.DownDuration(keyD)) {
            this.robot.rotation = this.robot.body.angle;
            this.direction.x = 1
        }
        if(this.cursors.up.isDown || Phaser.Input.Keyboard.DownDuration(keyW)) {
            this.robot.rotation = this.robot.body.angle;
            this.direction.y = -1
        } else if(this.cursors.down.isDown || Phaser.Input.Keyboard.DownDuration(keyS)) {
            this.robot.rotation = this.robot.body.angle;
            this.direction.y = 1
        }
        this.direction.normalize()
        this.robot.setVelocity(this.robot.maxVelocity * this.direction.x, this.robot.maxVelocity * this.direction.y)

        // check collisions
        // this.physics.overlap
    }
}