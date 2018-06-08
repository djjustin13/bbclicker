class Clicker{
    block:Block
    element:HTMLElement
    x:number
    y:number

    constructor(block:Block, name:string){
        this.block = block

        this.element = document.createElement("i")
        this.element.classList.add("fas", name)
        document.body.appendChild(this.element)

        this.x = this.randomNumber(0, window.innerWidth-250)
        this.y = this.randomNumber(100, window.innerHeight-50)
        this.element.style.left = this.x + "px"
        this.element.style.top = this.y + "px"
    }

    public timer(){
        this.block.clickBlock()
    }

    randomNumber(min:number, max:number) {
        let a:number = Math.floor(Math.random() * (max - min + 1) ) + min;
        return a
    }
}