class Resource extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, v) {
        let randomResource = ['bolt', 'nut', 'screw'];
        super(scene, x, y, randomResource[Math.floor(Math.random() * randomResource.length)]);

        // maintain scene context 
        this.parentScene = scene


        // set up physics sprite 
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.body.pushable = false;
        this.body.setSize(20,20);
        this.setDrag(200);

        // velocity
        this.direction = new Phaser.Math.Vector2(0)
        this.direction.x = (Math.random() * 2 - 1);
        this.direction.y = (Math.random() * 2 - 1);
        this.direction.normalize();
        this.body.velocity.x = v * this.direction.x;
        this.body.velocity.y = v * this.direction.y;
    }

    update() {
        if (resourceCount < 30) {
            this.parentScene.addResource(this.parent); 
            resourceCount++; 
        }
    }


}