class Shop{
    private block: Block
    public clickers:any[] = []

    constructor(b:Block){
        this.block = b

        let shop = document.createElement("p")
        shop.innerHTML = "Studiepunten shop"
        shop.style.top = "55px"
        shop.style.right = "25px"
        document.body.appendChild(shop)

        new ShopItem("Koop student | 1", 35).getElement().addEventListener("click", ()=> this.buyStudent())
        new ShopItem("Koop peercoach | 5", 60).getElement().addEventListener("click", ()=> this.buyPeercoach())
        new ShopItem("Koop klas | 10", 85).getElement().addEventListener("click", ()=> this.buyGroup())
        new ShopItem("Koop docent | 25", 110).getElement().addEventListener("click", ()=> this.buyTeacher())

    }

    buyStudent(){
        if(this.block.buy(1)){
            this.clickers.push(new Student(this.block))
        }
    }

    buyPeercoach(){
        if(this.block.buy(5)){
            this.clickers.push(new Peercoach(this.block))
        }
    }

    buyGroup(){
        if(this.block.buy(10)){
            this.clickers.push(new Group(this.block))
        }
    }

    buyTeacher(){
        if(this.block.buy(25)){
            this.clickers.push(new Teacher(this.block))
        }
    }
}