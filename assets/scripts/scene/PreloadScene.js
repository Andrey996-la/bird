// Прелоадер
class PreloadScene extends Phaser.Scene {
    constructor() {
        super("Preload")
    }

    preload() {}

    create() {
        // this.scene.start('Game')
        this.scene.start('Start')
    }
}