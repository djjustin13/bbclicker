class Ui{
    private blockScore:HTMLElement
    private pointScore:HTMLElement
    private mute:HTMLElement
    private block:Block
    private screen:PlayScreen
    private muted: boolean = false

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
        exit.addEventListener("click", () => this.screen.exit())
        document.body.appendChild(exit)

        this.mute = document.createElement("i")
        this.mute.classList.add("fas", "fa-volume-up", "mute")
        this.mute.addEventListener("click", () => this.muteSound())
        document.body.appendChild(this.mute)
    }

    update(){
        this.blockScore.innerHTML = "Building blocks: "+ this.block.getScore()
        this.pointScore.innerHTML = "Studiepunten: "+ this.block.getPoints()
    }

    muteSound(){
        if(this.muted == false){
            this.muted = true
            this.mute.classList.remove("fa-volume-up")
            this.mute.classList.add("fa-volume-off")
            Howler.volume(0.0)
        }else{
            this.muted = false
            this.mute.classList.add("fa-volume-up")
            this.mute.classList.remove("fa-volume-off")
            Howler.volume(0.5)
        }
        
    }
}