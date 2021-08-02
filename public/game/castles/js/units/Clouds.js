class Clouds {
    static src = 'images/clouds_spritesheet.png';

    constructor(x, y, width, height, speed, spriteSheetPos, imageObj) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.spriteSheetPos = spriteSheetPos;
        this.imageObj = imageObj;

        this.render();
    }

    render() {
        this.x += this.speed;

        game.context.drawImage(this.imageObj, this.spriteSheetPos.x, this.spriteSheetPos.y, this.width, this.height, this.x, this.y, this.width, this.height);

        if (this.x > game.canvas.width) {
            this.x = -this.width;
        }
    }
}