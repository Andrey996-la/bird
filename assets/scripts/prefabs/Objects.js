class Objects extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.is_pause = false
        this.kill = false
        this.collision = ''

        this.scene = scene
        // this.countMax = 100; // Максималтное кол-во инитов
        // this.countCreated = 0;  // Счетик создания кол-во инитов
        this.timer = this.scene.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.tick,
            callbackScope: this,
        })
    }

    tick() {
        this.createObjects()
        // if(this.countCreated < this.countMax) {
        //     this.createObjects()
        // } else {
        //     this.timer.remove()
        // }
    }

    createObjects() {
        const random = Phaser.Math.Between(1, 5)

        let object = this.getFirstDead()

        if (!object) {
            object = random === 1 ? Ring.generate(this.scene) : Enemy.generate(this.scene)
            this.add(object)
        } else {
            object.reset()
        }

        if (this.is_pause) {
            object.stopMove()
        } else {
            object.startMove()
        }



        object.move()
        // this.countCreated++ //при каждом вызове увеличить на 1
    }

    statusPause(pause, collision) {
        this.is_pause = pause
    }
}