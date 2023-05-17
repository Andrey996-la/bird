class Forest extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.is_pause = false
        this.scene = scene
        this.timer = this.scene.time.addEvent({
            delay: 2000,
            loop: true,
            callback: this.tick,
            callbackScope: this,
        })
    }

    tick() {
        this.createForest()
    }

    createForest() {
        let object = Wood.generate(this.scene)

        this.add(object)

        object.move()

        if (this.is_pause) {
            object.stopMove()
        } else {
            object.startMove()
        }
    }

    statusPause(pause) {
        this.is_pause = pause
    }
}