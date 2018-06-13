/// <reference path="clicker.ts"/>

class GalacticEmpire extends Clicker{ 
    constructor(b:Block){
        super(b, "fa-empire")
        this.element.style.fontSize = "55px"
    } 

    public timer(){
        this.block.clickBlock(10000000)
    }
}