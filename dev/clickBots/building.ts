/// <reference path="clicker.ts"/>

class Building extends Clicker{ 
    constructor(b:Block){
        super(b, "fa-building")
        this.element.style.fontSize = "55px"
    } 

    public timer(){
        this.block.clickBlock(300)
    }
}