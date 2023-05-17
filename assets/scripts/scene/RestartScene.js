class RestartScene extends Phaser.Scene {
    constructor() {
        super("Restart")
    }

    create(data) {
        this.score = data.score
        this.createBackground() // созданиие бекграунда общего
        this.createColorBg()
        this.createTitle()
        this.createRip()
        this.createRestartBtn()
        this.playThemeSong()
    }

    update() {
        this.bg.tilePositionX += 0.2
    }

    createBackground() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0).setAlpha(0.5)
    }

    createColorBg() {
        this.bgGraphics = this.add.graphics();
        this.bgGraphics.fillStyle(0x000000, .1)
        this.bgGraphics.fillRect(0, 0, config.width, config.height)
    }

    createTitle() {
        this.titleStar = this.add.sprite(game.config.width / 2, 100, 'star1').setOrigin(0.5)
        this.titleStar.scaleX = 0.5
        this.titleStar.scaleY = 0.5

        this.title = this.add.text(game.config.width / 2, 80, "О НЕТ!!!", {
            font: '56px YanoneKaffeesatz', fill: '#FFFFFF',
        }).setOrigin(0.5).setAngle(-5)

        this.subTitle = this.add.text(game.config.width / 2, 140, ['Зверюшка ', ' Спеклась!'], {
            font: '24px YanoneKaffeesatz', fill: '#FFFFFF',
        }).setOrigin(0.5).setAngle(-5)
    }

    createRip() {
        this.rip = this.add.sprite(game.config.width / 2, game.config.height - 80, 'rip').setOrigin(0.5)
        this.rip.scaleX = 0.7
        this.rip.scaleY = 0.7
    }

    createRestartBtn() {
        this.restartTopLine = this.add.graphics();
        this.restartTopLine.lineStyle(10, 0xFFFFFF, 1);
        this.restartTopLine.lineBetween(0, (game.config.height / 2) - 80, game.config.width, (game.config.height / 2) - 80,);

        this.restartBotLine = this.add.graphics();
        this.restartBotLine.lineStyle(10, 0xFFFFFF, 1);
        this.restartBotLine.lineBetween(0, (game.config.height / 2) + 80, game.config.width, (game.config.height / 2) + 80,);

        this.restartMidLine = this.add.graphics();
        this.restartMidLine.lineStyle(150, 0x000000, .3);
        this.restartMidLine.lineBetween(0, (game.config.height / 2), game.config.width, (game.config.height / 2));


        this.restartStar = this.add.sprite(game.config.width / 2, game.config.height / 2, 'star2').setOrigin(0.5)
        this.restartStar.scaleX = 0.7
        this.restartStar.scaleY = 0.7


        this.restart = this.add.sprite(game.config.width / 2, game.config.height / 2, 'restart').setOrigin(0.5).setInteractive({useHandCursor: true})
        this.restart.scaleX = 0.6
        this.restart.scaleY = 0.6

        this.restartText = this.add.text(game.config.width / 2, (game.config.height / 2) - 20, ['Начать', 'Заного'], {
            font: '24px YanoneKaffeesatz', fill: '#FFFFFF', strokeThickness: 6, stroke: '#015b05'
        }).setOrigin(0.5)

        this.restartText = this.add.text(game.config.width / 2, (game.config.height / 2) + 130, 'кликни чтобы начать заново', {
            font: '18px YanoneKaffeesatz', fill: '#FFFFFF',
        }).setOrigin(0.5)

        this.restart.on('pointerdown', function () {
            this.scene.scene.start('Game')
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
}