let config = {
    type: Phaser.AUTO,
    width: 720,
    height: 761,
    scene: [BootScene, PreloadScene, StartScene, LeaderScene, ChoiceScene, RestartScene, GameScene],
    scoreList: [
        {
            name: 'me',
            score: 280,
            userId: 1
        },
        {
            name: 'me1',
            score: 280,
            userId: 2
        },
        {
            name: 'me2',
            score: 280,
            userId: 3
        },
        {
            name: 'me3',
            score: 280,
            userId: 4
        },
        {
            name: 'me4',
            score: 280,
            userId: 5
        },
        {
            name: 'me54',
            score: 280,
            userId: 6
        },
        {
            name: 'me5',
            score: 280,
            userId: 7
        },
        {
            name: 'me6',
            score: 280,
            userId: 8
        },
    ],
    timeout: 1,
    score: 0,
    fontStyle: {
        font: '24px YanoneKaffeesatz', fill: '#FFFFFF'
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: 0
        }
    },
    userId: 4,
};

let game = new Phaser.Game(config);