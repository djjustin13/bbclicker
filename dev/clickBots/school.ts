/// <reference path="clicker.ts"/>

class School extends Clicker{ 
    constructor(b:Block){
        super(b, "fa-school")
        this.element.style.fontSize = "45px"
    } 

    public timer(){
        this.block.clickBlock(100)
    }
}