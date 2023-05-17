// начало
class StartScene extends Phaser.Scene {
    constructor() {
        super("Start")
    }

    create() {
        this.createBackground() // созданиие бекграунда общего
        this.createColorBg()
        this.playButton()
        this.gameLogo()
        this.adsButton()
        this.shareBtn()
        this.leadersBtn()
        this.musicBtn()
        this.playThemeSong()
    }

    update() {
        this.bg.tilePositionX += 0.2
    }




    createBackground() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0)
    }

    adsButton() {
        this.ads = this.add.sprite(game.config.width / 2, game.config.height - 120, 'ads').setOrigin(0.5).setInteractive({useHandCursor: true})
        this.ads.scaleX = 0.5
        this.ads.scaleY = 0.5
        this.ads.title = this.add.text(game.config.width / 2, game.config.height - 125, [` Убрать`, `рекламу`], {
            font: '12 YanoneKaffeesatz', fill: '#fec000'
        }).setOrigin(0.5)

        this.ads.on('pointerover', function () {
            this.setFrame('hover');
        });

        this.ads.on('pointerout', function () {
            this.setFrame('active');
        })

        this.ads.on('pointerdown', function () {
            window.open('https://google.com', "_blank");
        })
    }

    gameLogo() {
        this.logo = this.add.sprite(game.config.width / 2, 0, 'logo').setOrigin(.5, -0.1)
        this.logo.scaleX = 0.4
        this.logo.scaleY = 0.4

        this.tweens.add({
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: 4,
            scaleX: 0.42,
            scaleY: 0.42,
            targets: [this.logo],
            yoyo: true,
        });
    }

    leadersBtn() {
        this.leaders = this.add.sprite(game.config.width / 2, game.config.height - 50, 'leaders').setOrigin(0.5).setInteractive({useHandCursor: true})
        this.leaders.scaleX = 0.6
        this.leaders.scaleY = 0.6

        this.leaders.on('pointerdown', function () {
            this.scene.scene.start('Leader')
            this.scene.sounds.theme.stop()
        })
    }

    musicBtn() {
        this.music = this.add.sprite(game.config.width / 2 + 100, game.config.height - 120, 'music').setOrigin(0.5).setInteractive({useHandCursor: true})
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

    shareBtn() {
        this.share = this.add.sprite(game.config.width / 2 - 100, game.config.height - 120, 'share').setOrigin(0.5).setInteractive({useHandCursor: true}).setFrame('active')
        this.share.scaleX = 0.5
        this.share.scaleY = 0.5

        this.share.on('pointerdown', function () {
            window.open('https://google.com', "_blank");
        })

        this.share.on('pointerover', function () {
            this.setFrame('hover');
        });

        this.share.on('pointerout', function () {
            this.setFrame('active');
        })
    }

    createColorBg() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5)
        graphics.fillRect(0, 0, config.width, config.height)
    }

    playButton() {
        this.playBtn = this.add.sprite(game.config.width / 2, 50, 'play-button', 0).setInteractive({useHandCursor: true}).setOrigin(.5, -1.5);
        this.playBtn.scaleX = 0.5
        this.playBtn.scaleY = 0.5

        this.playBtn.on('pointerover', function () {
            this.setFrame('play hover');
        });

        this.playBtn.on('pointerout', function () {
            this.setFrame('play active');
        })

        this.playBtn.on('pointerdown', function () {
            this.setFrame('play')
            this.scene.scene.start('Choice')
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