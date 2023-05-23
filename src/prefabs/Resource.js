class Resource extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        let randomResource = ['bolt', 'nut', 'screw'];
        super(scene, Math.random() * (map.widthInPixels - 64) + 32, Math.random() * (map.heightInPixels - 64) + 32, randomResource[Math.floor(Math.random() * randomResource.length)]);

        // maintain scene context 
        this.parentScene = scene

        // set up physics sprite 
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.body.immovable = true
        this.body.setSize(20,20);
        // this.body.onOverlap = true
    }

    update() {
        if (resourceCount < 30) {
            this.parentScene.addResource(this.parent); 
            resourceCount++; 
        }
    }


}