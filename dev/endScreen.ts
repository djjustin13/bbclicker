class EndScreen{
    private game: Game

    constructor(g:Game, points:number, blocks:number) {
        this.game = g

        let logo = document.createElement("logo")
        logo.style.top = "20vh"
        logo.addEventListener("click",()=> this.nextLevel())
        document.body.appendChild(logo)

        let score = document.createElement("h1")
        score.style.top = "62vh"
        score.style.left = "28vw"
        score.innerHTML = `Je verzamelde ${String(points)} studiepunten en ${String(blocks)} building blocks!`
        document.body.appendChild(score)
    }

    public update(): void {
    }

    private nextLevel(){
        this.game.showPlayScreen()
    }
}