class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.animation()

        this.init()
    }

    static generateAttribites() {
        const x = config.width + 200
        const y = Phaser.Math.Between(100, config.height - 100)
        return {x, y}
    }

    static generate(scene) {
        const data = Enemy.generateAttribites()
        return new Enemy(scene, data.x, data.y, 'rocket', 'rocket1')
    }

    init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.enable = true
        this.velocity = -250
        this.scene.events.on('update', this.update, this)
        this.body.setSize(this.width, this.height, 0, 0).setOffset(0, 0)
        this.scaleX = 0.7 // размеры
        this.scaleY = 0.7 // размеры
    }

    stopMove() {
        this.body.enable = false
    }

    startMove() {
        this.body.enable = true
    }

    // reset() {
    //     // оптимизация
    //     const data = Enemy.generateAttribites()
    //     this.x = data.x
    //     this.y = data.y
    //     this.setFrame('rocket1')
    //     this.setAlive(true)
    // }

    // update() {
    //     if (this.active && this.x < -this.width) {
    //         this.setAlive(false) // Деактивация обьекта
    //     }
    // }

    // setAlive(status) {
    //     this.body.enable = status// Деавтивировать физ тело
    //     this.setVisible(status) // скрыть текстуру
    //     this.setActive(status)// Деактивировать обьект
    // }

    move() {
        this.body.setVelocityX(this.velocity)
    }

    animation() {
        const frames = this.scene.anims.generateFrameNames('rocket', {
            prefix: 'rocket', start: 1, end: 2
        })

        this.scene.anims.create({
            key: 'flyRocket', frames, frameRate: 3, repeat: -1
        })

        this.play('flyRocket')
    }
}

