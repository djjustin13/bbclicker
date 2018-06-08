/// <reference path="clicker.ts"/>

class Teacher extends Clicker{ 
    constructor(b:Block){
        super(b, "fa-user-tie")
        this.element.style.fontSize = "40px"
    } 

    public timer(){
        this.block.clickBlock(20)
    }
}