class Block{
element: HTMLElement

    private score:number = 0
    private points:number = 0

    constructor(){
        this.element = document.createElement("block")
        document.body.appendChild(this.element)

        this.element.addEventListener("click", ()=> this.clickBlock())
    }

    public clickBlock(n:number = 1){
        this.score += n
        if(this.score > 99){
            this.score -= 100
            this.points +=1
        }
        this.element.style.transform = `scale(1.1)`
        setTimeout(()=> this.scaleDown(), 100)

    }

    private scaleDown(){
        this.element.style.transform = `scale(1)`
    }

    public buy(n:number){
        if(this.points >= n){
            this.points -= n
            return true
        }

    }

    public getScore(){
        return this.score
    }

    public getPoints(){
        return this.points
    }
}
