class Ui{
    blockScore:HTMLElement
    pointScore:HTMLElement
    block:Block

    constructor(b:Block){
        this.blockScore = document.createElement("p")
        this.blockScore.innerHTML = "Building blocks: 0"
        this.pointScore = document.createElement("p")
        this.pointScore.innerHTML = "Studiepunten: 0"
        this.pointScore.style.top = "25px"

        this.block = b
        document.body.appendChild(this.blockScore)
        document.body.appendChild(this.pointScore)
    }

    update(){
        this.blockScore.innerHTML = "Building blocks: "+ this.block.getScore()
        this.pointScore.innerHTML = "Studiepunten: "+ this.block.getPoints()
    }
}