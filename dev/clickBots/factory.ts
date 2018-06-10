/// <reference path="clicker.ts"/>

class Factory extends Clicker{ 
    constructor(b:Block){
        super(b, "fa-industry")
        this.element.style.fontSize = "55px"
    } 

    public timer(){
        this.block.clickBlock(700)
    }
}