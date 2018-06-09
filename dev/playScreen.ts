class PlayScreen{
    private game:Game
    private block:Block
    private ui:Ui
    private shop:Shop

    constructor(g:Game){
        this.game = g

        this.block = new Block()
        this.ui = new Ui(this, this.block)
        this.shop = new Shop(this.block)

        setInterval(()=> this.gameTimer(), 1000)

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    }

    private onKeyDown(e: KeyboardEvent): void {
        console.log("knopje")
        switch (e.keyCode) {
            case 27:
                this.exit()
                break
        }
    }

    public update():void{
        this.ui.update()
    }

    private gameTimer(){
        if(this.shop.clickers.length > 0){
            for(let clicker of this.shop.clickers){
                clicker.timer()
            }
        }
    }

    public exit(){
        this.game.showEndScreen(this.block.getPoints(), this.block.getScore())
    }
}