class Wood extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.animation()

        this.init()
    }

    static generateAttribites() {
        const x = config.width + 200
        const y = Phaser.Math.Between(config.height - 100, config.height - 150)
        return {x, y}
    }

    static generate(scene) {
        const data = Wood.generateAttribites()
        return new Wood(scene, data.x, data.y, 'wood', 'wood1')
    }

    init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        this.velocity = -250
        this.scene.events.on('update', this.update, this)
        this.body.setSize(this.width, this.height, 0, 0).setOffset(0, 0)

        let random  = Phaser.Math.Between(3, 7)
        this.scaleX = `0.${random}` // размеры
        this.scaleY = `0.${random}` // размеры
    }

    move() {
        this.body.setVelocityX(this.velocity)
    }

    animation() {
        const frames = this.scene.anims.generateFrameNames('wood', {
            prefix: 'wood', start: 1, end: 6
        })

        this.scene.anims.create({
            key: 'getWood', frames, frameRate: 6, repeat: -1
        })

        this.play('getWood')
    }

    stopMove() {
        this.body.enable = false
    }

    startMove() {
        this.body.enable = true
    }
}

