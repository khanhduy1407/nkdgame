class Castle {
    x = 1;
    y = 210;
    width = 130;
    height = 193;
    defaultHealth = 100;
    health = this.defaultHealth;
    gold = 0;
    coinWidth = 29;
    coinHeight = 35;
    player = 1;
    imageObj = null;
    coinImageObj = game.loader.images.coin;
    static src  = "images/castle.png";
    static src2 = "images/castle2.png";
    static coinSrc = "images/coin.png";

    constructor(imageObj) {
        this.imageObj = imageObj;
    }

    render() {
        if (this.health <= 0 && !game.isGameOver) {
            game.gameOver(this.player);
        }

        game.context.drawImage(this.imageObj, this.x, this.y, this.width, this.height);

        // Coins
        game.context.font = "20pt Arial";
        game.context.fillText(this.gold, this.x + 50, 37);
        game.context.drawImage(this.coinImageObj, this.x + 15, 10, this.coinWidth, this.coinHeight);

        this.drawScrollbar();
    }

    drawScrollbar () {
        if (this.health < 0) {
            this.health = 0;
        }

        let width = 110;
        let height = 15;
        let currentWidth = width * this.health / this.defaultHealth;

        // Draw the background
        game.context.fillStyle = '#ca0d0d';
        game.context.fillRect(this.x + 10, this.y - 30, width, height);
        // Draw the fill
        game.context.fillStyle = '#57d83a';
        game.context.fillRect(this.x + 10, this.y - 30, currentWidth, height);
        game.context.fillStyle = '#000';
    }
}

class Castle2 extends Castle {
    x = 890;
    height = 192;
    src = "images/castle2.png";
    player = 2;
}