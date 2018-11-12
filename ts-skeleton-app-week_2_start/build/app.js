class Game {
    constructor(canvasId) {
        this.player = "Player1";
        this.score = 400;
        this.lives = 3;
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.highscores = [
            {
                playerName: 'Loek',
                score: 40000
            },
            {
                playerName: 'Daan',
                score: 34000
            },
            {
                playerName: 'Rimmert',
                score: 200
            }
        ];
        this.level_screen();
    }
    start_screen() {
        this.writeAsteroidHeading();
        this.writeIntroText();
        this.writeStartButton();
        this.drawAsteroid();
    }
    level_screen() {
        this.drawPlayerLives();
        this.drawYourScore();
        this.drawImage('./assets/images/SpaceShooterRedux/PNG/Meteors/', ['meteorBrown_big1', 'meteorBrown_big3', 'meteorBrown_small2', 'meteorBrown_med3', 'meteorGrey_big2', 'meteorGrey_med1', 'meteorGrey_small1', 'meteorGrey_tiny2', 'meteorGrey_tiny1'], [50, this.canvas.width - 50], [50, this.canvas.height - 50], true, 5);
        this.drawImage('./assets/images/SpaceShooterRedux/PNG/', ['playerShip1_blue'], [this.canvas.width / 2], [this.canvas.height / 2]);
    }
    title_screen() {
        this.writePlayerScore();
        this.writeHighScores();
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    writeAsteroidHeading() {
        this.ctx.font = '6em Minecraft';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#FFF';
        this.ctx.fillText('Asteroids', this.canvas.width / 2, this.canvas.height / 4);
    }
    writeIntroText() {
        this.ctx.font = '2.5em Minecraft';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#FFF';
        this.ctx.fillText('Press Play to start', this.canvas.width / 2, this.canvas.height / 2);
    }
    writeStartButton() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#FFF';
        this.ctx.fillRect(this.canvas.width / 2 - 100, this.canvas.height / 1.3, 200, 50);
        this.ctx.stroke();
        this.ctx.font = '1em Minecraft';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#000';
        this.ctx.fillText('Play', this.canvas.width / 2, this.canvas.height / 1.3 + 30);
    }
    drawAsteroid() {
        let img = new Image();
        img.src = './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png';
        img.onload = () => {
            this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2, this.canvas.height / 1.75);
        };
    }
    drawPlayerLives() {
        for (let i = 0; i < this.lives; i++) {
            let img = new Image();
            img.src = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png';
            img.onload = () => {
                let posY = (10 + img.width) * i + 20;
                this.ctx.drawImage(img, posY, 20);
            };
        }
    }
    drawYourScore() {
        this.ctx.font = '1.3em Minecraft';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#FFF';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`Your score: ${this.score}`, this.canvas.width - 15, 30);
    }
    drawRandomAsteroids() {
        const asteroids = ['meteorBrown_big1', 'meteorBrown_big3', 'meteorBrown_small2', 'meteorBrown_med3', 'meteorGrey_big2', 'meteorGrey_med1', 'meteorGrey_small1', 'meteorGrey_tiny2', 'meteorGrey_tiny1'];
        for (let i = 0; i < 5; i++) {
            let img = new Image();
            img.src = `./assets/images/SpaceShooterRedux/PNG/Meteors/${asteroids[this.randomNumber(0, asteroids.length)]}.png`;
            img.onload = () => {
                let posY = this.randomNumber(50, this.canvas.width - 50);
                let posX = this.randomNumber(50, this.canvas.height - 50);
                this.ctx.drawImage(img, posY, posX);
            };
        }
    }
    drawSpaceShip() {
        let img = new Image();
        img.src = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png';
        img.onload = () => {
            this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2, this.canvas.height / 2 - img.height / 2);
        };
    }
    drawImage(src, name, posY, posX, random, len, dynamic) {
        if (!len) {
            len = name.length;
        }
        for (let i = 0; i < len; i++) {
            let img = new Image();
            img.src = src + name[i] + '.png';
            img.onload = () => {
                if (random) {
                    console.log(posY);
                    console.log(posX);
                    this.ctx.drawImage(img, this.randomNumber(posY[0], posY[1]), this.randomNumber(posX[0], posX[1]));
                }
                else if (dynamic) {
                }
                else {
                    this.ctx.drawImage(img, posY[i] - img.width / 2, posX[i] - img.height / 2);
                }
            };
        }
    }
    writePlayerScore() {
        this.ctx.font = '3em Minecraft';
        this.ctx.fillStyle = '#FFF';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Your score is: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2.2);
    }
    writeHighScores() {
        this.ctx.font = '1.75em Minecraft';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#FFF';
        for (let i = 0; i < this.highscores.length; i++) {
            this.ctx.fillText(`${i}: ${this.highscores[i].playerName} - ${this.highscores[i].score}`, this.canvas.width / 2, this.canvas.height / 1.8 + i * 40);
        }
    }
}
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map