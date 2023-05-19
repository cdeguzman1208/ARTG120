class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player', 0);

        // maintain scene context 
        this.parentScene = scene

        // set up physics sprite 
        this.parentScene.add.existing(this); 
        this.parentScene.physics.add.existing(this);
        this.body.set

        // Properties
        this.stage = 1;
        this.maxScrap = 10;
        this.nScrap = 0;
        this.maxVelocity = 700;
        this.velocity = this.maxVelocity;
    }

    update() {

    }

    collect() {
        if(this.nScrap >= this.maxScrap){
            this.velocity -= 10;
        }
        this.nScrap++;
    }

    evolve() {
        this.stage++;
        this.maxVelocity += 200;
        this.velocity = this.maxVelocity;
    }
}
