class ShopItem{
    private element:HTMLElement
    private shop:Shop
    private block:Block
    private type:string
    private label:string
    private icon:string
    private price: number

    constructor(shop:Shop, block:Block, type:string, icon:string, text:string, price:number, topOffset:number){
        this.shop = shop
        this.block = block
        this.label = text
        this.icon = `<i class="fas fa-${icon}"></i>`
        this.type = type
        this.price = price
        this.element = document.createElement("p")
        this.element.style.top = String(50 + topOffset)+"px"
        this.element.classList.add("shop")
        document.body.appendChild(this.element)

        this.element.addEventListener("click", () => this.buy())
    }

    private buy(){
        if(this.block.buy(this.price)){
            if(this.price < 10){
                this.price++
            }else{
                this.price = Math.round(this.price * 1.3)
            }
            let n:any = new window[this.type](this.block)
            this.shop.clickers.push(n)
        }
    }

    update(){
        this.element.innerHTML = this.icon + " " + this.label + String(this.price)
    }

    getElement():HTMLElement{
        return this.element
    }
}