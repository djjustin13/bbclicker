/// <reference path="clicker.ts"/>

class Peercoach extends Clicker{ 

    constructor(b:Block){
        super(b, "fa-user-graduate")

    }

    public timer(){
        this.block.clickBlock(6)
    }
}