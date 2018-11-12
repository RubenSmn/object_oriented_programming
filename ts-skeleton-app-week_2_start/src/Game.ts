interface Highscore {
    playerName: string
    score: number
}


class Game {
    //global attr for canvas
    //readonly attributes must be initialized in the constructor
    private readonly canvas: HTMLCanvasElement; // find the right type
    private readonly ctx: CanvasRenderingContext2D; // find the right type

    //some global player attributes
    private readonly player: string = "Player1";
    private readonly score: number = 400;
    private readonly lives: number = 3;
    private readonly highscores: Array<Highscore>; //TODO: do not use 'any': write an interface!

    public constructor(canvasId: HTMLCanvasElement) {
        //construct all canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        //set the context of the canvas
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
        ]

        // all screens: uncomment to activate
        // this.start_screen();
        this.level_screen();
        // this.title_screen();

    }

    //-------- Splash screen methods ------------------------------------
    /**
     * Function to initialize the splash screen
     */
    public start_screen() {
        //1. add 'Asteroids' text
        this.writeAsteroidHeading()
        //2. add 'Press to play' text
        this.writeIntroText()
        //3. add button with 'start' text
        this.writeStartButton()
        //4. add Asteroid image
        this.drawAsteroid()
    }

    //-------- level screen methods -------------------------------------
    /**
     * Function to initialize the level screen
     */
    public level_screen() {
        //1. load life images
        this.drawPlayerLives()
        //2. draw current score
        this.drawYourScore()
        //3. draw random asteroids
        // this.drawRandomAsteroids()
        this.drawImage('./assets/images/SpaceShooterRedux/PNG/Meteors/', ['meteorBrown_big1', 'meteorBrown_big3', 'meteorBrown_small2', 'meteorBrown_med3', 'meteorGrey_big2', 'meteorGrey_med1', 'meteorGrey_small1', 'meteorGrey_tiny2', 'meteorGrey_tiny1'], [50, this.canvas.width - 50], [50, this.canvas.height - 50], true, 5)
        //4. draw player spaceship
        // this.drawSpaceShip()
        this.drawImage('./assets/images/SpaceShooterRedux/PNG/', ['playerShip1_blue'], [this.canvas.width / 2], [this.canvas.height / 2])
    }

    //-------- Title screen methods -------------------------------------

    /**
    * Function to initialize the title screen
    */
    public title_screen() {
        //1. draw your score
        this.writePlayerScore()
        //2. draw all highscores
        this.writeHighScores()
    }

    //-------Generic canvas functions ----------------------------------

    /**
    * Renders a random number between min and max
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }


    // Draw heading on canvas
    private writeAsteroidHeading() {
        this.ctx.font = '6em Minecraft'
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = '#FFF'
        this.ctx.fillText('Asteroids', this.canvas.width / 2, this.canvas.height / 4)
    }

    // Draw intro text on canvas
    private writeIntroText() {
        this.ctx.font = '2.5em Minecraft'
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = '#FFF'
        this.ctx.fillText('Press Play to start', this.canvas.width / 2, this.canvas.height / 2)
    }

    // Draw startbutton on canvas
    private writeStartButton() {
        this.ctx.beginPath()
        this.ctx.fillStyle = '#FFF'
        this.ctx.fillRect(this.canvas.width / 2 - 100, this.canvas.height / 1.3, 200, 50)
        this.ctx.stroke()
        this.ctx.font = '1em Minecraft'
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = '#000'
        this.ctx.fillText('Play', this.canvas.width / 2, this.canvas.height / 1.3 + 30)
    }

    // Draw asteroid on the canvas
    private drawAsteroid() {
        let img: HTMLImageElement = new Image()
        img.src = './assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png'
        img.onload = () => {
            this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2, this.canvas.height / 1.75)
        }
    }

    // Draw players lives on the canvas
    private drawPlayerLives() {
        for (let i: number = 0; i < this.lives; i++) {
            let img: HTMLImageElement = new Image()
            img.src = './assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png'
            img.onload = () => {
                let posY: number = (10 + img.width) * i + 20
                this.ctx.drawImage(img, posY, 20)
            }
        }
    }

    // Draw players score on the canvas
    private drawYourScore() {
        this.ctx.font = '1.3em Minecraft'
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = '#FFF'
        this.ctx.textAlign = 'right'
        this.ctx.fillText(`Your score: ${this.score}`, this.canvas.width - 15, 30)
    }

    // Draw random asteroids on canvas
    private drawRandomAsteroids() {
        const asteroids = ['meteorBrown_big1', 'meteorBrown_big3', 'meteorBrown_small2', 'meteorBrown_med3', 'meteorGrey_big2', 'meteorGrey_med1', 'meteorGrey_small1', 'meteorGrey_tiny2', 'meteorGrey_tiny1']
        for (let i: number = 0; i < 5; i++) {
            let img: HTMLImageElement = new Image()
            img.src = `./assets/images/SpaceShooterRedux/PNG/Meteors/${asteroids[this.randomNumber(0, asteroids.length)]}.png`
            img.onload = () => {
                let posY: number = this.randomNumber(50, this.canvas.width - 50)
                let posX: number = this.randomNumber(50, this.canvas.height - 50)
                this.ctx.drawImage(img, posY, posX)
            }
        }
    }

    // Draw spaceship on canvas
    private drawSpaceShip() {
        let img: HTMLImageElement = new Image()
        img.src = './assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png'
        img.onload = () => {
            this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2, this.canvas.height / 2 - img.height / 2)
        }
    }


    // Draw image on canvas
    private drawImage(src: string, name: string[], posY: number[], posX: number[], random?: boolean, len?: number, dynamic?: boolean) {
        if (!len) {
            len = name.length
        }
        for (let i: number = 0; i < len; i++) {
            let img: HTMLImageElement = new Image()
            img.src = src + name[i] + '.png'
            img.onload = () => {
                if (random) {
                    console.log(posY)
                    console.log(posX)
                    this.ctx.drawImage(img, this.randomNumber(posY[0], posY[1]), this.randomNumber(posX[0], posX[1]))
                } else if (dynamic) {
                    // this.ctx.drawImage(img, i * , posX[0])
                } else {
                    this.ctx.drawImage(img, posY[i] - img.width / 2, posX[i] - img.height / 2)
                }
            }
        }
    }

    // Draw playerscore on canvas
    private writePlayerScore() {
        this.ctx.font = '3em Minecraft'
        this.ctx.fillStyle = '#FFF'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(`Your score is: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2.2)
    }

    // Draw all highscores on canvas
    private writeHighScores() {
        this.ctx.font = '1.75em Minecraft'
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = '#FFF'
        for (let i: number = 0; i < this.highscores.length; i++) {
            this.ctx.fillText(`${i}: ${this.highscores[i].playerName} - ${this.highscores[i].score}`, this.canvas.width / 2, this.canvas.height / 1.8 + i * 40)
        }
    }
}

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const Asteroids = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
};
//add loadlistener for custom font types
window.addEventListener('load', init);
