class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        // reset stage for replay
        stage = 0

        this.selectSFX = this.sound.add('select')
        
        // add sounds
        this.selectSFX = this.sound.add('select')
        this.pickupSFX = this.sound.add('pickup')
        this.dropSFX = this.sound.add('drop')
        this.upgradeSFX = this.sound.add('upgrade')
        this.hooraySFX = this.sound.add('hooray')

        // variables/settings
        resourceCount = 0; 
        ratCount = 0; 
        this.direction = new Phaser.Math.Vector2(0)
        // vulture params
        this.numVultures = 20;                           // number of vultures
        this.vultureSpeed = 1000;
        this.vulturePatrolDist = 200;

        // robot sprite name array for evolution
        this.spriteArray = ['robot', 'robot2', 'robot3'];
        this.baseArray = ['base', 'base2', 'base2'];

        // set up scene switcher
        this.input.keyboard.on('keydown', (event) => {
            switch(event.key) {
                case 'Escape':
                    // console.log('menu')
                    this.selectSFX.play()
                    this.scene.start('menuScene')
                    break
                case 'r':
                    // console.log('play')
                    this.selectSFX.play()
                    this.scene.restart()
                    break
                case 'Backspace':
                    // console.log('credits')
                    this.selectSFX.play()
                    this.scene.start('creditsScene')
                    break
                case 't' :
                    this.selectSFX.play()
                    this.scene.start('tutorialScene')
                    break
                default:
                    break
            }
        })

        // add environment
        map = this.add.tilemap('tilemapJSON')
        const tileset = map.addTilesetImage('tilesheet', 'tilesetImage')
        const bgLayer = map.createLayer('floor', tileset, 0, 0)
        const trLayer = map.createLayer('terrain', tileset, 0, 0).setDepth(100)

        // add base
        this.base = new Workshop(this, map.widthInPixels / 2, map.heightInPixels / 2, this.baseArray[stage])

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
            key: 'ratWalk', 
            frameRate: 3, 
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('rat', {
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

        // enable collision
        this.robot.body.setCollideWorldBounds(true)
        trLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(this.robot, trLayer)

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
        this.resourceText = this.add.text(20, 20, `Scrap x${this.robot.nScrap}`).setScrollFactor(0).setDepth(200);

        // robot-resource overlap check
        this.physics.add.overlap(this.robot, this.resourceGroup, (robot,resource) => {
            if(resource.body.velocity.x == 0 && resource.body.velocity.y == 0){
                this.pickupSFX.play()
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
                this.upgradeSFX.play()
                stage++;
                robot.evolve();
                base.evolve();
            }
            if(stage == 2) {
                this.base.setScale(2)
                base.scrapText.y = centerY + 300
            }
            robot.runVelocity = robot.maxVelocity;
        }, null, this);

        // rat group 
        this.ratGroup = this.add.group({
            runChildUpdate: true
        });
        // this.addRat();
        this.time.delayedCall(2500, () => { 
            this.addRat(); 
        });

        // rat & resource collision
        this.physics.add.overlap(this.ratGroup, this.resourceGroup, (rat, resource) => {
            if(resource.body.velocity.x == 0 && resource.body.velocity.y == 0){
                if (rat.s < 3 && rat.scrap == false) {
                    // this.pickupSFX.play()
                    resource.destroy();
                    resourceCount--; 
                    rat.steal();
                }
            }
        }, null, this)

        // player & rat collision
        this.physics.add.overlap(this.robot, this.ratGroup, (robot, rat) => {
            if (rat.s > 0) {
                // rat.disableBody(true); 
                for (let i = rat.s; i > 0; i--) {
                    rat.scurry(); 
                    let resource = new Resource(this, rat.x, rat.y, 0);
                    this.resourceGroup.add(resource); 
                }
                rat.s = 0; 
                rat.scrap = true; 
            }
            else if (rat.turn == false) {
                rat.scurry(); 
            }   
        }, null, this)

        // add test vulture
        this.vulture = new Vulture(this, map.widthInPixels / 2, map.heightInPixels / 2, 1000, 200);
        this.vulture.chooseDestination();

        // add vulture group
        this.vultureGroup = this.add.group({
            runChildUpdate: true
        });
        for(let i = 0; i < this.numVultures; i++) {
            let randX = Phaser.Math.Between(50, map.widthInPixels - 50);
            let randY = Phaser.Math.Between(50, map.widthInPixels - 50);

            let newVulture = new Vulture(this, randX, randY, this.vultureSpeed, this.vulturePatrolDist);
            newVulture.chooseDestination();

            this.vultureGroup.add(newVulture)
        }

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

    addRat() {
        // console.log('rat'); 
        let rat = new Rat(this, 150); 
        this.ratGroup.add(rat); 
        // ratCount++; 
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
            this.dropSFX.play()
            this.robot.throwScrap();
        }

        // temp vulture update
        // this.vulture.update();


    }
}