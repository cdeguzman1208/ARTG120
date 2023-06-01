class Vulture extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed, patrolDist) {
        super(scene, x, y, 'vulture');

        // maintain scene context 
        this.parentScene = scene

        // setup physics sprite
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        // properties
        this.travelling = false;
        this.patrolDist = patrolDist;
        this.speed = speed;
        this.patrolling = true;

        // target coordinates
        this.targetX = x;
        this.targetY = y;

        // start flying animation
        this.play('fly');
    }

    update() {

    }

    chooseDestination() {
        // make patrol destination the edge of a square for now
        this.targetX = Phaser.Math.Between(this.x - this.patrolDist, this.x + this.patrolDist);
        this.targetY = Phaser.Math.Between(this.y - this.patrolDist, this.y + this.patrolDist);
        let vX = (this.targetX - this.x); 
        let vY = (this.targetY - this.y);
        this.setVelocity(vX, vY);
        // console.log(`vX = ${this.body.velocity.x}`)
        // console.log(`vY = ${this.body.velocity.y}`)

        this.patrolTime = this.parentScene.time.delayedCall(1000, () => {
            this.setVelocity(0,0);
            this.waitTime = this.parentScene.time.delayedCall(2000, () => {
                this.chooseDestination();
            })
        })
    }

}