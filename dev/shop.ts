class Shop{
    private block: Block
    
    public clickers:any[] = []
    private items:ShopItem[] = []

    constructor(b:Block){
        this.block = b

        let shop = document.createElement("p")
        shop.innerHTML = "Studiepunten shop"
        shop.style.top = "55px"
        shop.style.right = "25px"
        document.body.appendChild(shop)

        this.items.push(new ShopItem(this, this.block, "Student", "Koop student | ", 1, 35))
        this.items.push(new ShopItem(this, this.block, "Peercoach", "Koop peercoach | ", 5, 60))
        this.items.push(new ShopItem(this, this.block, "Group", "Koop klas | ", 10, 85))
        this.items.push(new ShopItem(this, this.block, "Teacher", "Koop docent | ", 25, 110))
        this.items.push(new ShopItem(this, this.block, "School", "Koop school | ", 100, 135))
        this.items.push(new ShopItem(this, this.block, "Building", "Koop bedrijf | ", 300, 160))
        this.items.push(new ShopItem(this, this.block, "Factory", "Koop fabriek | ", 800, 185))


    }

    update(){
        for(let item of this.items){
            item.update()
        }
    }
}