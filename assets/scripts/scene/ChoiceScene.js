class ChoiceScene extends Phaser.Scene {
    constructor() {
        super("Choice")
    }

    create() {
        this.createBackground()
        this.createTitle()
        this.createName()
        this.createPrev()
        this.createNext()
        this.createSlider()
        this.playThemeSong()
    }

    update() {
        this.bg.tilePositionX += 0.2
    }

    createBackground() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0)
    }

    createTitle() {
        this.title = this.add.text(game.config.width / 2, 100, "Choose your chicken", {
            font: '42px YanoneKaffeesatz', fill: '#FFFFFF'
        }).setOrigin(0.5)
    }

    createName() {
        this.name = this.add.text(game.config.width / 2, 200, "Coco", {
            font: '42px YanoneKaffeesatz', fill: '#FFFFFF'
        }).setOrigin(0.5).setInteractive()

        this.name.on('pointerdown', function () {
            this.scene.scene.start('Game')
            this.scene.sounds.theme.stop()
        })
    }

    createPrev() {
        this.prev = this.add.sprite(game.config.width / 2 - 100, 200, 'left-arrow').setOrigin(0.5).setInteractive({useHandCursor: true})
        this.prev.scaleX = 0.4
        this.prev.scaleY = 0.4
        this.prev.on('pointerdown', function () {
            console.log('prev')
        })
    }

    createNext() {
        this.next = this.add.sprite(game.config.width / 2 + 100, 200, 'right-arrow').setOrigin(0.5).setInteractive({useHandCursor: true})
        this.next.scaleX = 0.4
        this.next.scaleY = 0.4
        this.next.on('pointerdown', function () {
            console.log('next')
            this.scene.sliderCount = this.scene.sliderCount + 1
        })
    }

    createSlider() {
        this.chickenGroup = this.add.group({
            key: 'chicken', frame: [0, 1, 2, 3, 4], setXY: {
                x: -game.config.width, y: game.config.height / 2, stepX: game.config.width / 2, stepY: 0
            }
        });
    }

    playThemeSong() {
        this.sounds = {
            theme: this.sound.add('theme')
        }

        this.sounds.theme.loop = true;

        this.sounds.theme.play({
            volume: 0.4
        })
    }
}