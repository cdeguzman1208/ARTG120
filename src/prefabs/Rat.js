class Rat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        let side = Math.floor(Math.random() * 4); 
        // top -> right -> bottom -> left 
        if (side == 0) {
            // console.log("top");
            super(scene, Math.random() * (map.widthInPixels - 64) + 32, -32, 'rat'); 
            this.side = 0; 
        }
        else if (side == 1) {
            // console.log("right");
            super(scene, map.widthInPixels + 32, Math.random() * (map.heightInPixels - 64) + 32, 'rat'); 
            this.side = 1; 
        }
        else if (side == 2) {
            // console.log("bottom");
            super(scene, Math.random() * (map.widthInPixels - 64) + 32, map.heightInPixels + 32, 'rat'); 
            this.side = 2; 
        }
        else {
            // console.log("left");
            super(scene, -32, Math.random() * (map.heightInPixels - 64) + 32, 'rat'); 
            this.side = 3; 
        }

        // maintain scene context 
        this.parentScene = scene

        // set up physics sprite 
        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.body.immovable = true; 

        if (this.side == 0) {
            this.setVelocity(0, 100); 
        }
        else if (this.side == 1) {
            this.setVelocity(-100, 0); 
        }
        else if (this.side == 2) {
            this.setVelocity(0, -100); 
        }
        else {
            this.setVelocity(100, 0); 
        }

        this.scrap = false; 
        this.s = 0; 
        this.turn = false; 
        // this.maxVelocity = 150; 

        this.anims.play('ratWalk');
    }

    steal() {
        if (this.s < 3) {
            this.s++; 

            if (this.s == 3) {
                this.scrap = true; 
                
                if (this.side == 0) {
                    this.setVelocity(0, -100); 
                    this.side = 2; 
                }
                else if (this.side == 1) {
                    this.setVelocity(100, 0); 
                    this.side = 3; 
                }
                else if (this.side == 2) {
                    this.setVelocity(0, 100); 
                    this.side = 0; 
                }
                else {
                    this.setVelocity(-100, 0); 
                    this.side = 1; 
                }
            }
        }
    }

    scurry() {
        // this.scrap = true; 

        if (this.turn == false) {
            if (this.side == 0) {
                this.setVelocity(0, -200); 
                this.side = 2; 
            }
            else if (this.side == 1) {
                this.setVelocity(200, 0); 
                this.side = 3; 
            }
            else if (this.side == 2) {
                this.setVelocity(0, 200); 
                this.side = 0; 
            }
            else {
                this.setVelocity(-200, 0); 
                this.side = 1; 
            }

            this.turn = true; 
        }
    }

    update() {
        if (ratCount < 5) {
            this.parentScene.addRat(this.parent); 
            ratCount++; 
            // console.log(ratCount)
        }

        this.rotation = this.body.angle; 

        if ((this.side == 0) && (this.y > (this.height + map.heightInPixels))) {
            // console.log("-top");
            this.destroy();
            ratCount--;
            // console.log(ratCount)
        }
        else if ((this.side == 1) && (this.x < -this.width)) {
            // console.log("-right");
            this.destroy();
            ratCount--;
            // console.log(ratCount)
        }
        else if ((this.side == 2) && (this.y < -this.height)) {
            // console.log("-bottom");
            this.destroy();
            ratCount--;
            // console.log(ratCount)
        }
        else if ((this.side == 3) && (this.x > (this.width + map.widthInPixels))) {
            // console.log("-left");
            this.destroy();
            ratCount--;
            // console.log(ratCount)
        }
    }
}