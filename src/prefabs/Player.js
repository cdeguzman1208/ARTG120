class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'robot', 0);

        // maintain scene context 
        this.parentScene = scene

        // set up physics sprite 
        this.parentScene.add.existing(this); 
        this.parentScene.physics.add.existing(this);

        // Properties
        this.nScrap = 0;
        this.maxVelocity = 700;
        this.velocity = this.maxVelocity;
    }

    update() {

    }

    collect() {
        if(this.nScrap >= max_scraps_robot[stage]){
            this.velocity -= 100;
        }
        this.nScrap++;
    }

    evolve() {
        stage++;
        this.maxVelocity += 200;
        this.velocity = this.maxVelocity;
    }
}