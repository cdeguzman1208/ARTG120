class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        // variables/settings
        resourceCount = 0; 
        this.direction = new Phaser.Math.Vector2(0)

        // robot sprite name array for evolution
        this.spriteArray = ['robot', 'robot2', 'robot3'];

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
                case 't' :
                    this.scene.start('tutorialScene')
                    break
                default:
                    break
            }
        })

        // add environment
        map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tilesheet', 'tilesetImage')
        const bgLayer = map.createLayer('Floor', tileset, 0, 0)
        // const bgLayer = map.createLayer('Background', tileset, 0, 0)
        // const terrainLayer = map.createLayer('Terrain', tileset, 0, 0)
        // const treeLayer = map.createLayer('Trees', tileset, 0, 0).setDepth(200)

        // add base
        this.base = new Workshop(this, map.widthInPixels / 2, map.heightInPixels / 2, 'base')

        // create animations
        this.anims.create({
            key: 'walk',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('robot', {
                start: 0,
                end: 1
            })
        })
        this.anims.create({
            key: 'walk2',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('robot2', {
                start: 0,
                end: 1
            })
        })
        this.anims.create({
            key: 'walk3',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('robot3', {
                start: 0,
                end: 1
            })
        })
        this.anims.create({
            key: 'fly',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('vulture', {
                start: 0,
                end: 1
            })
        })


        // animation name array
        this.animArray = ['walk', 'walk2', 'walk3'];

        // add player
        this.robot = new Player(this, map.widthInPixels / 2, map.heightInPixels / 2 + 15, this.spriteArray[stage])

        // add test vulture
        this.vulture = new Vulture(this, map.widthInPixels / 2, map.heightInPixels / 2, 1000, 200).chooseDestination();


        // enable collision
        this.robot.body.setCollideWorldBounds(true)
        // terrainLayer.setCollisionByProperty({ collides: true })
        // treeLayer.setCollisionByProperty({ collides: true })
        // this.physics.add.collider(this.robot, terrainLayer)
        // this.physics.add.collider(this.robot, treeLayer)

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
            if(resource.body.velocity.x == 0 && resource.body.velocity.y == 0){
                resource.destroy();
                robot.collect();
                this.resourceText.text = `Scrap x${this.robot.nScrap}`
            }
        }, null, this)

        // robot-workshop overlap check
        this.physics.add.overlap(this.robot, this.base, 
            (robot,base) => {
            while(robot.nScrap > 0 && base.nScrap < max_scraps_base[stage]){
                robot.nScrap--;
                base.nScrap++;
            }
            this.resourceText.text = `Scrap x${this.robot.nScrap}`;
            base.scrapText.text = `${base.nScrap}/${max_scraps_base[stage]}`;
            if(base.nScrap == max_scraps_base[stage] && stage < 2){
                stage++;
                robot.evolve();
                base.evolve();
            }
            robot.runVelocity = robot.maxVelocity;
        }, null, this);


        // input
        this.cursors = this.input.keyboard.createCursorKeys()
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    addResource() {
        // console.log('resource')
        let resource = new Resource(this, Math.random() * (map.widthInPixels - 64) + 32, Math.random() * (map.heightInPixels - 64) + 32, 0);
        this.resourceGroup.add(resource); 
    }

    update() {
        // player movement
        this.direction.x = 0;
        this.direction.y = 0;
        if(this.cursors.left.isDown || keyA.isDown) {
            this.robot.rotation = this.robot.body.angle; 
            this.direction.x = -1
        } else if(this.cursors.right.isDown || keyD.isDown) {
            this.robot.rotation = this.robot.body.angle;
            this.direction.x = 1
        }
        if(this.cursors.up.isDown || keyW.isDown) {
            this.robot.rotation = this.robot.body.angle;
            this.direction.y = -1
        } else if(this.cursors.down.isDown || keyS.isDown) {
            this.robot.rotation = this.robot.body.angle;
            this.direction.y = 1
        }
        this.direction.normalize()
        this.robot.setVelocity(this.robot.runVelocity * this.direction.x, this.robot.runVelocity * this.direction.y)

        // console.log(this.robot.rotation);
        // console.log(this.robot.body.angle);

        // player throw scrap
        if(Phaser.Input.Keyboard.JustDown(this.cursors.space) && this.robot.nScrap > 0) {
            this.robot.throwScrap();
        }
    }
}