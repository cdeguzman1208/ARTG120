class Rat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        let side = Math.floor(Math.random() * 4); 
        // top -> right -> bottom -> left 
        if (side == 0) {
            super(scene, Math.random() * (map.widthInPixels - 64) + 32, -32, 'rat'); 
        }
        else if (side == 1) {
            super(scene, map.widthInPixels + 32, Math.random() * (map.heightInPixels - 64) + 32, 'rat'); 
        }
        else if (side == 2) {
            super(scene, Math.random() * (map.widthInPixels - 64) + 32, map.heightInPixels + 32, 'rat'); 
        }
        else {
            super(scene, -32, Math.random() * (map.heightInPixels - 64) + 32, 'rat'); 
        }
        // super(scene, x, y, 'enemy')

        // maintain scene context 
        this.parentScene = scene

        // set up physics sprite 
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)

        if (side == 0) {
            this.setVelocity(0, 100); 
        }
        else if (side == 1) {
            this.setVelocity(-100, 0); 
        }
        else if (side == 2) {
            this.setVelocity(0, -100); 
        }
        else {
            this.setVelocity(100, 0); 
        }

        this.scrap = false; 
        // this.maxVelocity = 150; 

        this.anims.play('ratWalk');
    }

    update() {
        if (ratCount < 5) {
            this.parentScene.addRat(this.parent); 
            ratCount++; 
        }

        this.rotation = this.body.angle; 

        
    }
}