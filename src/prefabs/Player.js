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
        this.invincible = false;
        this.blinking = false;

        // start animation
        this.play(this.parentScene.animArray[stage]);
    }

    update() {
        this.blink();
    }

    blink() {
        if(this.blinking){
            this.setAlpha(Math.sin(this.parentScene.time.now))
        }
    }

    collect() {
        if(this.nScrap >= max_scraps_robot[stage] && this.runVelocity > 0){
            this.runVelocity -= 20;
        }
        this.nScrap++;
        resourceCount--;
    }

    throwScrap() {
        if(this.nScrap > max_scraps_robot[stage]){
            this.runVelocity += 20;
        }

        let thrown = new Resource(this.parentScene, this.x , this.y, 200);
        // .setVelocity(200 * this.parentScene.direction.x, 200 * this.parentScene.direction.y);
        this.parentScene.resourceGroup.add(thrown); 
        resourceCount++;

        this.nScrap--;
        this.parentScene.resourceText.text = `Scrap x${this.nScrap}`
    }

    evolve() {
        this.maxVelocity += 50;
        this.setTexture(this.parentScene.spriteArray[stage]);
        this.play(this.parentScene.animArray[stage]);
        this.body.setSize(16 * Math.pow(2,stage));
    }
}