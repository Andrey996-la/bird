class Player extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, config.width / 2, config.height / 2, 'chicken', 'chicken1') // начальные координаты курицы

        this.animation()

        this.init()
    }

    init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        this.velocity = -500// Скорость
        this.body.setGravityY(1500) // гравитация
        // this.body.setSize(this.width, this.height, 0, 0).setOffset(0, 0)
        this.scaleX = 0.5 // размеры
        this.scaleY = 0.5 // размеры
    }

    animation() {
        const frames = this.scene.anims.generateFrameNames('chicken', {
            prefix: 'chicken', start: 1, end: 2
        })

        this.scene.anims.create({
            key: 'flyChicken', frames, frameRate: 3, repeat: -1
        })

        this.play('flyChicken')
    }

    move() {
        this.scene.input.on('pointerdown', () => {
            this.body.setVelocityY(this.velocity);

            this.scene.sounds.jump.play({
                volume: 0.4
            })
        })
    }

    stopMove() {
        this.body.enable = false
    }

    startMove() {
        this.body.enable = true
    }

    rocketBoom() {
        const frames = this.scene.anims.generateFrameNames('boom', {
            prefix: 'boom', start: 0, end: 8
        })

        this.scene.anims.create({
            key: 'boomChicken', frames, frameRate: 3, repeat: -1
        })

        this.play('boomChicken')
    }
}


// создать обьект кольца и генерировать врагов и кольлца в основном фале