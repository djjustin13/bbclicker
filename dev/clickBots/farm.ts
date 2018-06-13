/// <reference path="clicker.ts"/>

class Farm extends Clicker{ 
    constructor(b:Block){
        super(b, "fa-seedling")
        this.element.style.fontSize = "55px"
    } 

    public timer(){
        this.block.clickBlock(700)
    }
}