class Particle{
    x:number
    y:number
    element:HTMLElement
    block:Block

    constructor(b:Block, x:number, y:number){
        this.block = b
        this.x = this.randomNumber(x-20, x+220)
        this.y = this.randomNumber(y-20, y+200)

        this.element = document.createElement("particle")
        document.body.appendChild(this.element)

    }

    public update(){
        this.element.style.transform = `translate(${this.x}px, ${this.y-=2}px)`
        if (this.y < -20) this.delete()
    }

    private randomNumber(min:number, max:number) {
        let a:number = Math.floor(Math.random() * (max - min + 1) ) + min;
        return a
    }

    private delete(){
        this.element.remove()

        this.block.removeElement(this)
    }
}