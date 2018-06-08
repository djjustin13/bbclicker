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
        this.element = document.createElement("block");
        document.body.appendChild(this.element);
        this.element.addEventListener("click", function () { return _this.clickBlock(); });
    }
    Block.prototype.clickBlock = function (n) {
        var _this = this;
        if (n === void 0) { n = 1; }
        this.score += n;
        if (this.score > 99) {
            this.score -= 100;
            this.points += 1;
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
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
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
var PlayScreen = (function () {
    function PlayScreen(g) {
        var _this = this;
        this.game = g;
        this.block = new Block();
        this.ui = new Ui(this.block);
        this.shop = new Shop(this.block);
        this.gameLoop();
        setInterval(function () { return _this.gameTimer(); }, 1000);
    }
    PlayScreen.prototype.gameLoop = function () {
        var _this = this;
        this.ui.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    PlayScreen.prototype.gameTimer = function () {
        if (this.shop.clickers.length > 0) {
            for (var _i = 0, _a = this.shop.clickers; _i < _a.length; _i++) {
                var clicker = _a[_i];
                clicker.timer();
            }
        }
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
        shop.style.top = "5px";
        shop.style.right = "25px";
        document.body.appendChild(shop);
        new ShopItem("Koop student | 1", 35).getElement().addEventListener("click", function () { return _this.buyStudent(); });
        new ShopItem("Koop peercoach | 5", 60).getElement().addEventListener("click", function () { return _this.buyPeercoach(); });
        new ShopItem("Koop klas | 10", 85).getElement().addEventListener("click", function () { return _this.buyGroup(); });
        new ShopItem("Koop docent | 25", 110).getElement().addEventListener("click", function () { return _this.buyTeacher(); });
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
    return Shop;
}());
var ShopItem = (function () {
    function ShopItem(text, topOffset) {
        this.element = document.createElement("p");
        this.element.innerHTML = text;
        this.element.style.top = String(topOffset) + "px";
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
var Ui = (function () {
    function Ui(b) {
        this.blockScore = document.createElement("p");
        this.blockScore.innerHTML = "Building blocks: 0";
        this.pointScore = document.createElement("p");
        this.pointScore.innerHTML = "Studiepunten: 0";
        this.pointScore.style.top = "25px";
        this.block = b;
        document.body.appendChild(this.blockScore);
        document.body.appendChild(this.pointScore);
    }
    Ui.prototype.update = function () {
        this.blockScore.innerHTML = "Building blocks: " + this.block.getScore();
        this.pointScore.innerHTML = "Studiepunten: " + this.block.getPoints();
    };
    return Ui;
}());
//# sourceMappingURL=main.js.map