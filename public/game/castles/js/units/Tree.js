class Tree {

    static src = 'images/tree.png';

    constructor(imageObj) {
        this.imageObj = imageObj;
        this.x = Math.floor(Math.random() * 650) + 190;
        this.y = 430;
        this.width = 70;
        this.height = 100;
        this.hasGrown = false;
        this.time_to_grow = 100;
        this.growth_rate = 1;
    }

    render(tree) {
        let width = tree.width,
            height = tree.height;
        if (tree.time_to_grow > 0 && !tree.hasGrown) {
            width = width/100 * (100 - tree.time_to_grow);
            height = height/100 * (100 - tree.time_to_grow);
            tree.time_to_grow -= tree.growth_rate;
            tree.y -= 1;

        } else {
            tree.hasGrown = true;
        }

        game.context.drawImage(this.imageObj, tree.x, tree.y, width, height);
    }
}