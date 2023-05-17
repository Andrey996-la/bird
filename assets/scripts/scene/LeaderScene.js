class LeaderScene extends Phaser.Scene {
    constructor() {
        super("Leader")
    }

    create() {
        this.createBackground() // созданиие бекграунда общего
        this.createColorBg()
        this.createTitle()
        this.leaderTable()
        this.createBtnBack()
        this.playThemeSong()
        this.gameLogo()
    }

    update() {
        this.bg.tilePositionX += 0.2
    }



    createBackground() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0)
    }

    createTitle() {
        this.title = this.add.text(game.config.width / 2, 200, "Highscore", {
            font: '36px YanoneKaffeesatz', fill: '#FFFFFF'
        }).setOrigin(0.5)
    }

    leaderTable() {
        const cols = config.scoreList.length

        const graphics = this.add.graphics();

        for (let col = 0; col < cols; col++) {
            this.add.text(game.config.width / 2 - 100, 250 + (col * 50), `${config.scoreList[col].name}`, {
                font: '28px YanoneKaffeesatz', fill: '#FFFFFF'
            }).setOrigin(0.5)

            this.add.text(game.config.width / 2 + 100, 250 + (col * 50), `${config.scoreList[col].score}`, {
                font: '28px YanoneKaffeesatz', fill: '#FFFFFF'
            }).setOrigin(0.5)

            if (config.scoreList[col].userId === config.userId) {
                graphics.fillStyle(0xcc673b, 1)

                graphics.fillRoundedRect(game.config.width / 2 - 160, 230 + (col * 50), 320, 40, 10)

                this.listPerson = this.add.sprite(game.config.width / 2 - 160, 240 + (col * 50), 'chicken').setOrigin(.5)
                this.listPerson.scaleX = 0.3
                this.listPerson.scaleY = 0.3
            } else {
                graphics.fillStyle(0x351169, 1)

                graphics.fillRoundedRect(game.config.width / 2 - 150, 230 + (col * 50), 300, 40, 10)
            }
        }
    }

    createColorBg() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5)
        graphics.fillRect(0, 0, config.width, config.height)
    }

    createBtnBack() {
        this.btnBack = this.add.text(game.config.width / 2, (game.config.height) - 100, "Назад", {
            font: '42px YanoneKaffeesatz', fill: '#FFFFFF'
        }).setOrigin(0.5).setInteractive({useHandCursor: true})

        this.btnBack.on('pointerdown', function () {
            this.scene.scene.start('Start')
            this.scene.sounds.theme.stop()
        })
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

    gameLogo() {
        this.logo = this.add.sprite(game.config.width / 2, 100, 'logo').setOrigin(.5)
        this.logo.scaleX = 0.3
        this.logo.scaleY = 0.3

        this.tweens.add({
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: 4,
            scaleX: 0.34,
            scaleY: 0.34,
            targets: [this.logo],
            yoyo: true,
        });
    }
}