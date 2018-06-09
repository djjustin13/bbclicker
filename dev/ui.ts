class Ui{
    private blockScore:HTMLElement
    private pointScore:HTMLElement
    private block:Block
    private screen:PlayScreen

    constructor(s:PlayScreen, b:Block){
        this.block = b
        this.screen = s
        
        this.blockScore = document.createElement("p")
        this.blockScore.style.left = "25px"
        this.blockScore.innerHTML = "Building blocks: 0"
        this.pointScore = document.createElement("p")
        this.pointScore.innerHTML = "Studiepunten: 0"
        this.pointScore.style.top = "25px"
        this.pointScore.style.left = "25px"
        
        document.body.appendChild(this.blockScore)
        document.body.appendChild(this.pointScore)

        let exit = document.createElement("i")
        exit.classList.add("fas", "fa-times", "exit")
        exit.style.top = "10px"
        exit.style.right = "25px"
        exit.addEventListener("click", () => this.screen.exit())
        document.body.appendChild(exit)
    }

    update(){
        this.blockScore.innerHTML = "Building blocks: "+ this.block.getScore()
        this.pointScore.innerHTML = "Studiepunten: "+ this.block.getPoints()
    }
}