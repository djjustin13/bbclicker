class Shop{
    private block: Block
    
    public clickers:any[] = []
    private items:ShopItem[] = []

    constructor(b:Block){
        this.block = b

        let shop = document.createElement("p")
        shop.innerHTML = "Studiepunten shop"
        shop.classList.add("shopTitle")
        document.body.appendChild(shop)

        this.items.push(new ShopItem(this, this.block, "Student", "user", "Koop student | ", 1, 35))
        this.items.push(new ShopItem(this, this.block, "Peercoach", "user-graduate", "Koop peercoach | ", 5, 100))
        this.items.push(new ShopItem(this, this.block, "Group", "users", "Koop klas | ", 10, 165))
        this.items.push(new ShopItem(this, this.block, "Teacher", "user-tie", "Koop docent | ", 25, 230))
        this.items.push(new ShopItem(this, this.block, "School", "school", "Koop school | ", 100, 296))
        this.items.push(new ShopItem(this, this.block, "Building", "building", "Koop bedrijf | ", 300, 360))
        this.items.push(new ShopItem(this, this.block, "Factory", "industry", "Koop fabriek | ", 800, 425))


    }

    update(){
        for(let item of this.items){
            item.update()
        }
    }
}