class Vulture extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed, patrolDist) {
        super(scene, x, y, 'vulture');

        // maintain scene context 
        this.parentScene = scene

        // setup physics sprite
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.body.setImmovable(true);

        // properties
        this.patrolDist = patrolDist;
        this.speed = speed;
        this.chasing = false;
        this.direction = new Phaser.Math.Vector2(0)

        // target coordinates
        this.targetX = x;
        this.targetY = y;

        // start flying animation
        this.play('fly');

        // detection range
        this.detectionRadius = 200;
    }

    chooseDestination() {
        // make patrol destination the edge of a square for now
        // this.targetX = Phaser.Math.Between(this.x - this.patrolDist, this.x + this.patrolDist);
        // this.targetY = Phaser.Math.Between(this.y - this.patrolDist, this.y + this.patrolDist);


        // let vX = (this.targetX - this.x); 
        // let vY = (this.targetY - this.y);
        // this.setVelocity(vX, vY);

        this.direction.x = Math.cos(Math.random() * Math.PI)
        this.direction.y = Math.sin(Math.PI/2 + Math.random() * Math.PI)
        this.direction.normalize();
        this.setVelocity(this.direction.x * this.speed, this.direction.y * this.speed)


        this.patrolTime = this.parentScene.time.delayedCall(1000, () => {
            this.setVelocity(0,0);
            let nextWaitTime = Phaser.Math.Between(500,2000);
            this.waitTime = this.parentScene.time.delayedCall(nextWaitTime, () => {
                this.chooseDestination();
            })
        })
    }

    flyTo() {
        
    }

    detect() {
        let dx = this.x - this.parentScene.robot.x;
        let dy = this.y - this.parentScene.robot.y;
        if(Math.sqrt( Math.pow(dx, 2) + Math.pow(dy, 2) ) < this.detectionRadius) {
            console.log('in range')
            this.chasing = true;
        }
    }

    chase() {

    }

    update() {
        this.rotation = this.body.angle;
    }

}