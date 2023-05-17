class GameScene extends Phaser.Scene {
    constructor() {
        super("Game")
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        // info blocks
        this.createBackground() // созданиие общего бекграунда
        this.createPauseScreen()
        this.clickPause()
        this.createRecord()
        this.createScore()
        this.createClock()
        this.createSounds()

        this.bgPosition = 0.5

        // game objects
        this.is_pause = false

        this.player = new Player(this)

        this.forest = new Forest(this)

        this.timeout = config.timeout

        this.objects = new Objects(this)

        this.physics.add.overlap(this.objects, this.player, this.onOverlap, undefined, this)
    }

    update() {
        if (this.player.y > config.height) this.onKilled('felldown')

        this.player.move()

        this.bg.tilePositionX += this.bgPosition
    }

    onOverlap(source, target) {
        if (target.frame.texture.key === 'rocket') {
            this.onKilled('rocket')
        } else {
            this.scorePointValue.setText(config.score++)
            this.sounds.bell.play({
                volume: 1
            })
        }
    }

    onKilled(collision) {
        if (collision === 'rocket') {
            this.pauseBtn.setFrame('play')
            this.sounds.theme.stop()
            this.player.stopMove()
            this.player.rocketBoom()
            this.forest.statusPause(true)
        }

        this.time.addEvent({
            delay: 1500,
            callback: this.goRestartScene,
            callbackScope: this
        })
    }

    goRestartScene() {
        this.scene.start('Restart')
    }

    createBackground() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0) // фон едет
    }

    createClock() {
        this.clockImage = this.add.sprite(game.config.width - 50, 50, 'clock')
        this.clockImage.scaleX = 0.6
        this.clockImage.scaleY = 0.6

        this.clockText = this.add.text(game.config.width - 82, 60, "Ваше время!", {
            font: '16px YanoneKaffeesatz',
            fill: '#a9a3e1',
            strokeThickness: 6,
            stroke: '#2b237f'
        })

        this.clock = this.add.text(game.config.width - 70, 30, "00:00", config.fontStyle)

        let second = 0
        let min = 0
        let PreMin = 0
        let preSec = 0
        this.time.addEvent({
            delay: 1000,
            callback: function () {
                ++second

                if (second > 9) {
                    preSec = ''
                }

                if (second > 60) {
                    second = 0
                    preSec = 0
                    min += +1
                }

                if (min > 9) {
                    PreMin = ''
                }

                this.clock.setText(`${PreMin}${min}:${preSec}${second}`)
                this.scoreDistanceValue.setText(`${this.timeout * 10}m`)
                this.timeout++
            },
            callbackScope: this,
            loop: true
        })
    }

    createScore() {
        this.scoreImage = this.add.sprite(game.config.width / 2, 50, 'scoreBar').setOrigin(0.5)
        this.scoreImage.scaleX = 0.7
        this.scoreImage.scaleY = 0.7

        this.scoreDistanceText = this.add.text((game.config.width / 2) - 50, 35, "Дистанция", {
            font: '20px YanoneKaffeesatz',
            fill: '#9c9ae5'
        }).setOrigin(0.5)
        this.scoreDistanceValue = this.add.text((game.config.width / 2) - 50, 60, "0m", {
            font: '24px YanoneKaffeesatz',
            fill: '#FFFFFF'
        }).setOrigin(0.5)

        this.scorePointText = this.add.text((game.config.width / 2) + 50, 35, "Очки", {
            font: '20px YanoneKaffeesatz',
            fill: '#9c9ae5'
        }).setOrigin(0.5)
        this.scorePointValue = this.add.text((game.config.width / 2) + 50, 60, 0, {
            font: '24px YanoneKaffeesatz',
            fill: '#FFFFFF'
        }).setOrigin(0.5)
    }

    clickPause() {
        this.pauseBtn = this.add.sprite(game.config.width - 75, game.config.height - 75, 'play').setInteractive({useHandCursor: true})
        this.pauseBtn.scaleX = 0.5
        this.pauseBtn.scaleY = 0.5

        this.pauseBtn.on('pointerdown', () => {
            if (this.pauseBtn.frame.name === 'pause') {
                this.is_pause = true

                this.bgPosition = 0
                this.pauseBtn.setFrame('play')
                this.sounds.theme.pause()
                this.player.stopMove()
                this.objects.statusPause(this.is_pause)
                this.forest.statusPause(this.is_pause)
                this.togglePauseScreen(this.is_pause)
            } else if (this.pauseBtn.frame.name === 'play') {
                this.is_pause = false

                this.bgPosition = 0.5
                this.pauseBtn.setFrame('pause')
                this.sounds.theme.resume()
                this.player.startMove()
                this.objects.statusPause(this.is_pause)
                this.forest.statusPause(this.is_pause)
                this.togglePauseScreen(this.is_pause)
            }
        }, this)
    }

    createPauseScreen() {
        this.pauseBg = this.add.graphics();
        this.pauseBg.fillStyle(0x000000, 0.5)
        this.pauseBg.fillRect(0, 0, config.width, config.height)

        this.txt_pause = this.add.text(game.config.width / 2, game.config.height / 2, 'Pause', config.fontStyle)

        this.togglePauseScreen(false)
    }

    togglePauseScreen(is_visible) {
        this.pauseBg.setVisible(is_visible)
        this.txt_pause.setVisible(is_visible)
    }

    createRecord() {
        this.record = this.add.text(50, 50, "Record: 0", config.fontStyle)
    }

    createSounds() {
        this.sounds = {
            theme: this.sound.add('theme'),
            jump: this.sound.add('jump'),
            bell: this.sound.add('bell'),
        }
        this.sounds.theme.loop = true;
        this.sounds.theme.play({
            volume: 1
        })

        this.music = this.add.sprite(75, game.config.height - 75, 'music').setInteractive({useHandCursor: true})
        this.music.scaleX = 0.5
        this.music.scaleY = 0.5

        this.music.on('pointerup', () => {
            if (this.music.frame.name === 'music-active') {
                this.music.setFrame('music-off')
                this.sounds.theme.pause()
            } else if (this.music.frame.name === 'music-off') {
                this.music.setFrame('music-active')
                this.sounds.theme.resume()
            }
        });
    }
}