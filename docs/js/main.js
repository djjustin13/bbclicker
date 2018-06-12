"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Block = (function () {
    function Block() {
        var _this = this;
        this.score = 0;
        this.points = 0;
        this.particles = [];
        this.element = document.createElement("block");
        document.body.appendChild(this.element);
        this.element.addEventListener("click", function () { return _this.clickBlock(); });
    }
    Block.prototype.update = function () {
        var quotient = Math.floor(this.score / 100);
        var remainder = this.score % 100;
        this.points += quotient;
        this.score = remainder;
        for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
            var p = _a[_i];
            p.update();
        }
    };
    Block.prototype.removeElement = function (el) {
        for (var i = 0; i < this.particles.length; i++) {
            if (this.particles[i] === el) {
                this.particles.splice(i, 1);
            }
        }
    };
    Block.prototype.clickBlock = function (n) {
        var _this = this;
        if (n === void 0) { n = 1; }
        this.score += n;
        if (this.particles.length < 60) {
            this.particles.push(new Particle(this, this.element.offsetLeft, this.element.offsetTop));
        }
        this.element.style.transform = "scale(1.1)";
        setTimeout(function () { return _this.scaleDown(); }, 100);
    };
    Block.prototype.scaleDown = function () {
        this.element.style.transform = "scale(1)";
    };
    Block.prototype.buy = function (n) {
        if (this.points >= n) {
            this.points -= n;
            return true;
        }
    };
    Block.prototype.getScore = function () {
        return this.score;
    };
    Block.prototype.getPoints = function () {
        return this.points;
    };
    return Block;
}());
var EndScreen = (function () {
    function EndScreen(g, points, blocks) {
        var _this = this;
        this.game = g;
        var logo = document.createElement("logo");
        logo.style.top = "20vh";
        logo.addEventListener("click", function () { return _this.nextLevel(); });
        document.body.appendChild(logo);
        var score = document.createElement("h1");
        score.style.top = "62vh";
        score.style.left = "28vw";
        score.innerHTML = "Je verzamelde " + String(points) + " studiepunten en " + String(blocks) + " building blocks!";
        document.body.appendChild(score);
    }
    EndScreen.prototype.update = function () {
    };
    EndScreen.prototype.nextLevel = function () {
        this.game.showPlayScreen();
    };
    return EndScreen;
}());
var Game = (function () {
    function Game() {
        this.gameTime = 0;
        this.playing = false;
        this.screen = new StartScreen(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.screen.update();
        if (this.playing == true) {
            this.gameTime++;
            if (this.gameTime == 60) {
                this.gameTime = 0;
                this.screen.gameTimer();
            }
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.showPlayScreen = function () {
        document.body.innerHTML = "";
        this.playing = true;
        this.screen = new PlayScreen(this);
        this.screen.gameTimer();
    };
    Game.prototype.showEndScreen = function (p, s) {
        this.playing = false;
        document.body.innerHTML = "";
        this.screen = new EndScreen(this, p, s);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Particle = (function () {
    function Particle(b, x, y) {
        this.block = b;
        this.x = this.randomNumber(x - 20, x + 220);
        this.y = this.randomNumber(y - 20, y + 200);
        this.element = document.createElement("particle");
        document.body.appendChild(this.element);
        this.element.style.transform = "translate(" + this.x + "px, " + (this.y -= 3) + "px)";
    }
    Particle.prototype.update = function () {
        this.element.style.transform = "translate(" + this.x + "px, " + (this.y -= 3) + "px)";
        if (this.y < -20)
            this.delete();
    };
    Particle.prototype.randomNumber = function (min, max) {
        var a = Math.floor(Math.random() * (max - min + 1)) + min;
        return a;
    };
    Particle.prototype.delete = function () {
        this.element.remove();
        this.block.removeElement(this);
    };
    return Particle;
}());
var PlayScreen = (function () {
    function PlayScreen(g) {
        var _this = this;
        this.game = g;
        this.block = new Block();
        this.ui = new Ui(this, this.block);
        this.shop = new Shop(this.block);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    PlayScreen.prototype.onKeyDown = function (e) {
        console.log("knopje");
        switch (e.keyCode) {
            case 27:
                this.exit();
                break;
        }
    };
    PlayScreen.prototype.update = function () {
        this.ui.update();
        this.block.update();
        this.shop.update();
    };
    PlayScreen.prototype.gameTimer = function () {
        if (this.shop.clickers.length > 0) {
            for (var _i = 0, _a = this.shop.clickers; _i < _a.length; _i++) {
                var clicker = _a[_i];
                clicker.timer();
            }
        }
    };
    PlayScreen.prototype.exit = function () {
        this.game.showEndScreen(this.block.getPoints(), this.block.getScore());
    };
    return PlayScreen;
}());
var Shop = (function () {
    function Shop(b) {
        this.clickers = [];
        this.items = [];
        this.block = b;
        var shop = document.createElement("p");
        shop.innerHTML = "Studiepunten shop";
        shop.classList.add("shopTitle");
        document.body.appendChild(shop);
        this.items.push(new ShopItem(this, this.block, "Student", "user", "Koop student | ", 1, 35));
        this.items.push(new ShopItem(this, this.block, "Peercoach", "user-graduate", "Koop peercoach | ", 5, 100));
        this.items.push(new ShopItem(this, this.block, "Group", "users", "Koop klas | ", 10, 165));
        this.items.push(new ShopItem(this, this.block, "Teacher", "user-tie", "Koop docent | ", 25, 230));
        this.items.push(new ShopItem(this, this.block, "School", "school", "Koop school | ", 100, 296));
        this.items.push(new ShopItem(this, this.block, "Building", "building", "Koop bedrijf | ", 300, 360));
        this.items.push(new ShopItem(this, this.block, "Factory", "industry", "Koop fabriek | ", 800, 425));
    }
    Shop.prototype.update = function () {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.update();
        }
    };
    return Shop;
}());
var ShopItem = (function () {
    function ShopItem(shop, block, type, icon, text, price, topOffset) {
        var _this = this;
        this.shop = shop;
        this.block = block;
        this.label = text;
        this.icon = "<i class=\"fas fa-" + icon + "\"></i>";
        this.type = type;
        this.price = price;
        this.element = document.createElement("p");
        this.element.style.top = String(50 + topOffset) + "px";
        this.element.classList.add("shop");
        document.body.appendChild(this.element);
        this.element.addEventListener("click", function () { return _this.buy(); });
    }
    ShopItem.prototype.buy = function () {
        if (this.block.buy(this.price)) {
            if (this.price < 10) {
                this.price++;
            }
            else {
                this.price = Math.round(this.price * 1.3);
            }
            var n = new window[this.type](this.block);
            this.shop.clickers.push(n);
        }
    };
    ShopItem.prototype.update = function () {
        this.element.innerHTML = this.icon + " " + this.label + String(this.price);
    };
    ShopItem.prototype.getElement = function () {
        return this.element;
    };
    return ShopItem;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.game = g;
        var logo = document.createElement("logo");
        logo.addEventListener("click", function () { return _this.nextLevel(); });
        document.body.appendChild(logo);
    }
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.nextLevel = function () {
        this.game.showPlayScreen();
    };
    return StartScreen;
}());
var Ui = (function () {
    function Ui(s, b) {
        var _this = this;
        this.block = b;
        this.screen = s;
        this.blockScore = document.createElement("p");
        this.blockScore.style.left = "25px";
        this.blockScore.innerHTML = "Building blocks: 0";
        this.pointScore = document.createElement("p");
        this.pointScore.innerHTML = "Studiepunten: 0";
        this.pointScore.style.top = "25px";
        this.pointScore.style.left = "25px";
        document.body.appendChild(this.blockScore);
        document.body.appendChild(this.pointScore);
        var exit = document.createElement("i");
        exit.classList.add("fas", "fa-times", "exit");
        exit.style.top = "10px";
        exit.style.right = "25px";
        exit.addEventListener("click", function () { return _this.screen.exit(); });
        document.body.appendChild(exit);
    }
    Ui.prototype.update = function () {
        this.blockScore.innerHTML = "Building blocks: " + this.block.getScore();
        this.pointScore.innerHTML = "Studiepunten: " + this.block.getPoints();
    };
    return Ui;
}());
var Clicker = (function () {
    function Clicker(block, name) {
        this.block = block;
        this.element = document.createElement("i");
        this.element.classList.add("fas", name);
        document.body.appendChild(this.element);
        this.x = this.randomNumber(0, window.innerWidth - 250);
        this.y = this.randomNumber(100, window.innerHeight - 50);
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }
    Clicker.prototype.timer = function () {
        this.block.clickBlock();
    };
    Clicker.prototype.randomNumber = function (min, max) {
        var a = Math.floor(Math.random() * (max - min + 1)) + min;
        return a;
    };
    return Clicker;
}());
var Building = (function (_super) {
    __extends(Building, _super);
    function Building(b) {
        var _this = _super.call(this, b, "fa-building") || this;
        _this.element.style.fontSize = "55px";
        return _this;
    }
    Building.prototype.timer = function () {
        this.block.clickBlock(280);
    };
    return Building;
}(Clicker));
var Factory = (function (_super) {
    __extends(Factory, _super);
    function Factory(b) {
        var _this = _super.call(this, b, "fa-industry") || this;
        _this.element.style.fontSize = "55px";
        return _this;
    }
    Factory.prototype.timer = function () {
        this.block.clickBlock(700);
    };
    return Factory;
}(Clicker));
var Group = (function (_super) {
    __extends(Group, _super);
    function Group(b) {
        var _this = _super.call(this, b, "fa-users") || this;
        _this.element.style.fontSize = "40px";
        return _this;
    }
    Group.prototype.timer = function () {
        this.block.clickBlock(10);
    };
    return Group;
}(Clicker));
var Peercoach = (function (_super) {
    __extends(Peercoach, _super);
    function Peercoach(b) {
        return _super.call(this, b, "fa-user-graduate") || this;
    }
    Peercoach.prototype.timer = function () {
        this.block.clickBlock(6);
    };
    return Peercoach;
}(Clicker));
var School = (function (_super) {
    __extends(School, _super);
    function School(b) {
        var _this = _super.call(this, b, "fa-school") || this;
        _this.element.style.fontSize = "45px";
        return _this;
    }
    School.prototype.timer = function () {
        this.block.clickBlock(85);
    };
    return School;
}(Clicker));
var Student = (function (_super) {
    __extends(Student, _super);
    function Student(b) {
        return _super.call(this, b, "fa-user") || this;
    }
    return Student;
}(Clicker));
var Teacher = (function (_super) {
    __extends(Teacher, _super);
    function Teacher(b) {
        var _this = _super.call(this, b, "fa-user-tie") || this;
        _this.element.style.fontSize = "40px";
        return _this;
    }
    Teacher.prototype.timer = function () {
        this.block.clickBlock(20);
    };
    return Teacher;
}(Clicker));
//# sourceMappingURL=main.js.map