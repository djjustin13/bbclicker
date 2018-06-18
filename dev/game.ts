class Game {
    private screen:any
    private gameTime:number = 0
    private playing:boolean = false

    constructor() {
         this.screen = new StartScreen(this)
         this.gameLoop()
         Howler.volume(0.5);
    }
    
    private gameLoop():void{
        this.screen.update()

        if(this.playing == true){
            this.gameTime++
        
            if(this.gameTime == 60){
                this.gameTime = 0
                this.screen.gameTimer()
            }
        }
        requestAnimationFrame(() => this.gameLoop())
    }

    public showPlayScreen(){
        document.body.innerHTML = ""
        this.playing = true
        this.screen = new PlayScreen(this)
        this.screen.gameTimer()
    }

    public showEndScreen(p:number, s:number){
        this.playing = false
        document.body.innerHTML = ""
        this.screen = new EndScreen(this, p, s)
    }
    
} 


window.addEventListener("load", () => new Game())