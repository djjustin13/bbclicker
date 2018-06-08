class PlayScreen{
    private game:Game
    private block:Block
    private ui:Ui
    private shop:Shop

    constructor(g:Game){
        this.game = g

        this.block = new Block()
        this.ui = new Ui(this.block)
        this.shop = new Shop(this.block)

        this.gameLoop()
        setInterval(()=> this.gameTimer(), 1000)
    }

    private gameLoop():void{
        
        this.ui.update()
        requestAnimationFrame(() => this.gameLoop())
    }

    private gameTimer(){
        if(this.shop.clickers.length > 0){
            for(let clicker of this.shop.clickers){
                clicker.timer()
            }
        }
    }
}