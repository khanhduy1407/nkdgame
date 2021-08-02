class Unit {
    id = game.generateUniqueId();
    player = 1;
    x = 50;
    y = 340;
    health = 100;
    width = 100;
    height = 100;
    damage = 0;
    fightingWith = [];
    shootingWith = [];
    defaultSpeed = 0;
    defaultHealth = 0;
    damageToAll = false;
    isBusy = false;
    imageObj = game.loader.images.units_player1;
    spriteSheetPos = {x: 0, y: 0};
    static spriteSheet = 'images/units/units_spritesheet_player1.png';
    static spriteSheet2 = 'images/units/units_spritesheet_player2.png';

    render() {
        if (!this.fightingWith.length && !this.shootingWith.length && !this.isBusy) {
            if (!this.fightingWith.length) { //this.x < 900 &&
                this.x = this.x + this.defaultSpeed;
                this.t += this.t_param;
                this.y = this.y_param_a + (Math.sin(this.t) * this.y_param_b);
            }
        }

        game.context.drawImage(this.imageObj, this.spriteSheetPos.x, this.spriteSheetPos.y, this.width, this.height, this.x, this.y, this.width, this.height);
        this.drawHealthBar();
    }

    drawHealthBar() {
        let width = this.defaultHealth;
        let height = 7;
        let currentWidth = width * this.health / this.defaultHealth;
        let posOffset = (this.defaultHealth - this.width) / 2;

        // Draw the background
        game.context.fillStyle = '#ca0d0d';
        game.context.fillRect(this.x - posOffset, this.y - 15, width, height);
        // Draw the fill
        game.context.fillStyle = '#57d83a';
        game.context.fillRect(this.x - posOffset, this.y - 15, currentWidth, height);
        game.context.fillStyle = '#000';
    }

    action() {
        let self = this;
        for (let unitId in game.stage.units) {
            let unit = game.stage.units[unitId];
            // Check for collision with other units
            if (
                self.x+self.width/2 > unit.x &&
                self.player !== unit.player &&
                self.player === 1
            ) {
                self.speed = 0;
                unit.speed = 0;
                if (!unit.fightingWith.includes(self.id)) {
                    unit.fightingWith.push(self.id);
                }
                if (!self.fightingWith.includes(unit.id)) {
                    self.fightingWith.push(unit.id);
                }
            }
        }

        if (self.fightingWith.length) {
            // Deal damage to only one enemy
            if (!self.damageToAll) {
                let fightingWithId = self.fightingWith[0];
                game.dealDamage(self, game.stage.units[fightingWithId]);
            }

            for (let index  in self.fightingWith) {
                let unitId = self.fightingWith[index];
                let busyUnit = game.stage.units[unitId];

                // Take damage from each enemy
                game.dealDamage(busyUnit, self);

                // Deal damage to all
                if (self.damageToAll) {
                    game.dealDamage(self, busyUnit);
                }

                if (self.health <= 0) {
                    busyUnit.speed = -busyUnit.defaultSpeed;
                    busyUnit.fightingWith.shift();
                    delete game.stage.units[self.id];
                    game.removeFightingWith(self.id);
                    game.changeGold(busyUnit.player, self.winPrice);
                }

                if (busyUnit.health <= 0) {
                    self.fightingWith.shift();
                    self.speed = self.defaultSpeed;
                    delete game.stage.units[busyUnit.id];
                    game.removeFightingWith(busyUnit.id);

                    game.changeGold(self.player, busyUnit.winPrice);
                }
            }
        }

        // Collision with castles
        if (this.player === 1 && this.x - (this.width / 2) > (game.castle2.x - game.castle2.width / 2)) {
            game.castle2.health -= this.damage;
            game.removeFightingWith(this.id);
            delete game.stage.units[this.id];
            //game.addScore(1, 10);
        }

        if (this.player === 2 && this.x + (this.width / 2) < (game.castle.x + game.castle.width / 2)) {
            game.castle.health -= this.damage;
            game.removeFightingWith(this.id);
            delete game.stage.units[this.id];
            //game.addScore(2, 10);
        }
    }
    specialAction() {}
}

class Woodcutter extends Unit{
    spriteSheetPos = {x: 0, y: 0};
    spriteSheetCarryPos = {x: 33, y: 0};
    width = 33;
    height = 45;
    defaultHealth = 20;
    health = this.defaultHealth;
    damage = 3;
    defaultSpeed = 2;
    defaultCoolDownAttack = 50;
    cost = 10;
    wearingSpeed = this.defaultSpeed/2;
    cuttingSpeed = 100;
    path = [];
    winPrice = 1;
    treeGold = 30;
    t = 0.01;
    t_param = 0.007;
    y_param_a = 350 + Math.floor(Math.random() * 15) + 1;
    y_param_b = 55;
    isBusy = false;

    action() {
        const self = this;
        if (!self.isBusy) {
            // Twice slower
            this.path.push({'x': this.x, 'y': this.y});
            this.path.push({'x': this.x, 'y': this.y});

            if (game.stage.trees.length) {
                game.stage.trees.forEach( (tree, index) => {
                    if (tree.hasGrown &&
                        self.x + self.width / 2 > tree.x - tree.width / 2  &&
                        self.x + self.width / 2 < tree.x + tree.width / 2
                    ) {
                        self.isBusy = true;
                        self.damage = 0;
                        game.stage.trees.splice(index, 1);
                        self.path.reverse();
                    }
                });
            }
        } else {
            // Busy
            if (self.cuttingSpeed > 0) {
                self.cuttingSpeed--;
            } else {
                let path = self.path.shift();
                this.spriteSheetPos = this.spriteSheetCarryPos;
                if (path) {
                    self.x = path.x;
                    self.y = path.y;
                } else {
                    // Returned to castle
                    game.removeFightingWith(self.id);
                    delete game.stage.units[self.id];
                    game.changeGold(self.player, self.treeGold);
                }
            }
        }

        // TODO duplicate
        // Collision with castles
        if (this.player === 1 && this.x - (this.width / 2) > (game.castle2.x - game.castle2.width / 2)) {
            game.castle2.health -= this.damage;
            game.removeFightingWith(this.id);
            delete game.stage.units[this.id];
            //game.addScore(1, 10);
        }

        if (this.player === 2 && this.x + (this.width / 2) < (game.castle.x + game.castle.width / 2)) {
            game.castle.health -= this.damage;
            game.removeFightingWith(this.id);
            delete game.stage.units[this.id];
            //game.addScore(2, 10);
        }
    }
}

class Knight extends Unit {
    spriteSheetPos = {x: 0, y: 45};
    width = 37;
    height = 50;
    defaultHealth = 40;
    health = this.defaultHealth;
    damage = 10;
    defaultSpeed = 1.5;
    defaultCoolDownAttack = 100;
    cost = 20;
    winPrice = 5;
    t = 0.005;
    t_param = 0.0055;
    y_param_a = 330 + Math.floor(Math.random() * 15) + 1;
    y_param_b = 55;
}

class Archer extends Unit {
    spriteSheetPos = {x: 0, y: 95};
    width = 35;
    height = 55;
    defaultHealth = 25;
    health = this.defaultHealth;
    damage = 10;
    defaultSpeed = 1.2;
    attackDistance = 300;
    defaultCoolDownAttack = 500;
    cost = 30;
    winPrice = 5;
    t = 0.01;
    t_param = 0.0045;
    y_param_a = 340 + Math.floor(Math.random() * 15) + 1;
    y_param_b = 35;
    isShooting = false;

    specialAction() {
        const self = this;

        for (let unitId in game.stage.units) {
            let unit = game.stage.units[unitId];
            // Check for collision with other units
            let isFar = self.x + self.attackDistance > unit.x;
            if (self.player === 2) {
                isFar = self.x + self.attackDistance < unit.x;
            }
            if (
                isFar &&
                self.player !== unit.player &&
                 !self.shootingWith.length
            ) {
                self.shootingWith.push(unit.id);
                self.speed = 0;
            } else {
                self.speed = self.defaultSpeed;
            }

            if (self.shootingWith.length) {
                let unit = game.stage.units[self.shootingWith[0]];
                self.shoot(unit);
            }
        }
    }
    shoot(toUnit) {
        if (this.cooldownAttack > 0) {
            if (!this.isShooting) {
                let imageObj = this.player === 1 ? game.loader.images.arrow : game.loader.images.arrow2;
                game.stage.arrows.push(new Arrow(this.x, this.y, toUnit.x, toUnit.y, this.damage, toUnit.id, imageObj, this.player));
                this.isShooting = true;
            }
            this.cooldownAttack--;
        } else {
            this.cooldownAttack = this.defaultCoolDownAttack;
            this.isShooting = false;
        }
    }
}
