class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture, 0);

        // maintain scene context 
        this.parentScene = scene

        // set up physics sprite 
        this.parentScene.add.existing(this); 
        this.parentScene.physics.add.existing(this);
        this.body.setSize(16,16);

        // Properties
        this.nScrap = 0;
        this.maxVelocity = 200;
    }

    update() {
    }

    collect() {
        if(this.nScrap >= max_scraps_robot[stage] && this.maxVelocity > 0){
            this.maxVelocity -= 20;
        }
        this.nScrap++;
    }

    evolve() {
        stage++;
        this.maxVelocity += 200;
        this.velocity = this.maxVelocity;
    }
}