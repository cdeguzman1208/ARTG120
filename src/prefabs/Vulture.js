class Vulture extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed, patrolDist) {
        super(scene, x, y, '');

        // properties
        this.travelling = false;
        this.patrolDist = patrolDist;
        this.speed = speed;

        // target coordinates
        this.targetX = this.x;
        this.targetY = this.y;
    }

    update() {

    }

    chooseDestination() {
        // make patrol destination the edge of a square for now
        this.targetX = Phaser.Math.Between(-1*this.patrolDist, this.patrolDist);
        this.targetY = Phaser.Math.Between(-1*this.patrolDist, this.patrolDist);
        let vX = (targetX - this.x) / this.speed;
        let vY = (targetY - this.y) / this.speed;
        this.setVelocity(vX, vY);
        
    }

}