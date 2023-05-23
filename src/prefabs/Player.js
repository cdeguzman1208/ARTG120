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
        this.runVelocity = this.maxVelocity;

        // start animation
        this.play(this.parentScene.animArray[stage]);
    }

    update() {
    }

    collect() {
        if(this.nScrap >= max_scraps_robot[stage] && this.runVelocity > 0){
            this.runVelocity -= 20;
        }
        this.nScrap++;
        resourceCount--;
    }

    evolve() {
        this.maxVelocity += 50;
        this.setTexture(this.parentScene.spriteArray[stage]);
        this.play(this.parentScene.animArray[stage]);
        this.body.setSize(16 * Math.pow(2,stage));
    }
}