class StartScreen{
    private game: Game

    constructor(g:Game) {
        this.game = g

        let logo = document.createElement("logo")
        logo.addEventListener("click",()=> this.nextLevel())
        document.body.appendChild(logo)
    }

    public update(): void {
    }

    private nextLevel(){
        this.game.showPlayScreen()
    }
}