class Base extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture, 0)

        // set up physics sprite 
        this.parentScene.add.existing(this); 
        this.parentScene.physics.add.existing(this);

        // properties
        this.nScraps = 0;
    }

    
}