class Workshop extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture, 0)

        // scene context
        this.parentScene = scene;

        // set up physics sprite 
        this.parentScene.add.existing(this); 
        this.parentScene.physics.add.existing(this);

        // properties
        this.nScrap = 0;

        // display stored resources
        this.scrapText = this.parentScene.add.text(x, y + 35, `${this.nScrap}/${max_scraps_base[stage]}`, {color: '#000'}).setOrigin(0.5);
    }

    
}