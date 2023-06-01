class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, velocity) {
        super(scene, x, y, 'enemy')

        // maintain scene context 
        this.parentScene = scene

        // set up physics sprite 
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
    }

    update() {

    }
}
