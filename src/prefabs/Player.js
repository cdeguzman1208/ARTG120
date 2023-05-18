class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        super(scene, x, y, 'player')

        // maintain scene context 
        this.parentScene = scene

        // set up physics sprite 
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
    }

    update() {

    }
}
