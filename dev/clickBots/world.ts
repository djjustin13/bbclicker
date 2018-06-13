/// <reference path="clicker.ts"/>

class World extends Clicker{ 
    constructor(b:Block){
        super(b, "fa-globe")
        this.element.style.fontSize = "55px"
    } 

    public timer(){
        this.block.clickBlock(66000)
    }
}