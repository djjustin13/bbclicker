class Game {
    private screen:any

    constructor() {
         this.screen = new StartScreen(this)
         this.gameLoop()
    }
    
    private gameLoop():void{
        this.screen.update()
        
        requestAnimationFrame(() => this.gameLoop())
    }

    public showPlayScreen(){
        document.body.innerHTML = ""
        this.screen = new PlayScreen(this)
    }
    
} 


window.addEventListener("load", () => new Game())