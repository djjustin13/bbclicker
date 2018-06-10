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
    function Block(s) {
        var _this = this;
        this.score = 0;
        this.points = 0;
        this.screen = s;
        this.particles = [];
        this.element = document.createElement("block");
        document.body.appendChild(this.element);
        this.element.addEventListener("click", function () { return _this.clickBlock(); });
    }
    Block.prototype.update = function () {
        if (this.score > 99) {
            this.score -= 100;
            this.points += 1;
        }
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
        this.screen = new StartScreen(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.screen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.showPlayScreen = function () {
        document.body.innerHTML = "";
        this.screen = new PlayScreen(this);
    };
    Game.prototype.showEndScreen = function (p, s) {
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
        this.block = new Block(this);
        this.ui = new Ui(this, this.block);
        this.shop = new Shop(this.block);
        setInterval(function () { return _this.gameTimer(); }, 1000);
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
        var _this = this;
        this.clickers = [];
        this.block = b;
        var shop = document.createElement("p");
        shop.innerHTML = "Studiepunten shop";
        shop.style.top = "55px";
        shop.style.right = "25px";
        document.body.appendChild(shop);
        new ShopItem("Koop student | 1", 35).getElement().addEventListener("click", function () { return _this.buyStudent(); });
        new ShopItem("Koop peercoach | 5", 60).getElement().addEventListener("click", function () { return _this.buyPeercoach(); });
        new ShopItem("Koop klas | 10", 85).getElement().addEventListener("click", function () { return _this.buyGroup(); });
        new ShopItem("Koop docent | 25", 110).getElement().addEventListener("click", function () { return _this.buyTeacher(); });
        new ShopItem("Koop school | 100", 135).getElement().addEventListener("click", function () { return _this.buySchool(); });
        new ShopItem("Koop bedrijf | 300", 160).getElement().addEventListener("click", function () { return _this.buyBuilding(); });
        new ShopItem("Koop fabriek | 800", 185).getElement().addEventListener("click", function () { return _this.buyFactory(); });
    }
    Shop.prototype.buyStudent = function () {
        if (this.block.buy(1)) {
            this.clickers.push(new Student(this.block));
        }
    };
    Shop.prototype.buyPeercoach = function () {
        if (this.block.buy(5)) {
            this.clickers.push(new Peercoach(this.block));
        }
    };
    Shop.prototype.buyGroup = function () {
        if (this.block.buy(10)) {
            this.clickers.push(new Group(this.block));
        }
    };
    Shop.prototype.buyTeacher = function () {
        if (this.block.buy(25)) {
            this.clickers.push(new Teacher(this.block));
        }
    };
    Shop.prototype.buySchool = function () {
        if (this.block.buy(100)) {
            this.clickers.push(new School(this.block));
        }
    };
    Shop.prototype.buyBuilding = function () {
        if (this.block.buy(300)) {
            this.clickers.push(new Building(this.block));
        }
    };
    Shop.prototype.buyFactory = function () {
        if (this.block.buy(800)) {
            this.clickers.push(new Factory(this.block));
        }
    };
    return Shop;
}());
var ShopItem = (function () {
    function ShopItem(text, topOffset) {
        this.element = document.createElement("p");
        this.element.innerHTML = text;
        this.element.style.top = String(50 + topOffset) + "px";
        this.element.classList.add("shop");
        document.body.appendChild(this.element);
    }
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