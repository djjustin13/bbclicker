/// <reference path="clicker.ts"/>

class Laboratory extends Clicker{ 
    constructor(b:Block){
        super(b, "fa-flask")
        this.element.style.fontSize = "55px"
    } 

    public timer(){
        this.block.clickBlock(6200)
    }
}