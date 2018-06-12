class Game {
    private screen:any
    private gameTime:number = 0

    constructor() {
         this.screen = new StartScreen(this)
         this.gameLoop()
    }
    
    private gameLoop():void{
        this.screen.update()
        this.gameTime++
        
        if(this.gameTime == 60){
            this.gameTime = 0
            this.screen.gameTimer()
        }
        requestAnimationFrame(() => this.gameLoop())
    }

    public showPlayScreen(){
        document.body.innerHTML = ""
        this.screen = new PlayScreen(this)
    }

    public showEndScreen(p:number, s:number){
        document.body.innerHTML = ""
        this.screen = new EndScreen(this, p, s)
    }
    
} 


window.addEventListener("load", () => new Game())