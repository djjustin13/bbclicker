/// <reference path="clicker.ts"/>

class Group extends Clicker{ 
    constructor(b:Block){
        super(b, "fa-users")
        this.element.style.fontSize = "40px"
    } 

    public timer(){
        this.block.clickBlock(10)
    }
}