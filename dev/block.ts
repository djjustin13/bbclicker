class Block{
    private element: HTMLElement

    private score:number = 0
    private points:number = 0

    private sound:any
    private particles:Particle[]

    constructor(){
        this.sound = new Howl({
            src: ['sounds/block.mp3']
        })

        this.particles = []
        this.element = document.createElement("block")
        document.body.appendChild(this.element)

        this.element.addEventListener("click", ()=> this.clickBlock(1, true))
    }

    public update(){
        let quotient = Math.floor(this.score / 100)
        let remainder = this.score % 100

        this.points += quotient
        this.score = remainder

        for(let p of this.particles){
            p.update()
        }
    }

    public removeElement(el:any){
        for (let i = 0;i< this.particles.length ;i++) {

            if (this.particles[i] === el) {
    
                this.particles.splice(i, 1);
    
            }
        }
    }

    public clickBlock(n:number = 1, cursor:boolean = false){
        if(cursor == true){
            this.sound.play();
        }

        this.score += n

        if(this.particles.length < 60){
            this.particles.push(new Particle(this, this.element.offsetLeft, this.element.offsetTop))

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
