class ShopItem{
    private element:HTMLElement
    constructor(text:string, topOffset:number){
        this.element = document.createElement("p")
        this.element.innerHTML = text
        this.element.style.top = String(topOffset)+"px"
        this.element.classList.add("shop")
        document.body.appendChild(this.element)
    }

    getElement():HTMLElement{
        return this.element
    }
}