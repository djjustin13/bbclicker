/// <reference path="clicker.ts"/>

class Country extends Clicker{ 
    constructor(b:Block){
        super(b, "fa-chess-king")
        this.element.style.fontSize = "55px"
    } 

    public timer(){
        this.block.clickBlock(20000)
    }
}