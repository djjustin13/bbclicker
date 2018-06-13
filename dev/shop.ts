class Shop{
    private block: Block
    
    public clickers:Clicker[] = []
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
        this.items.push(new ShopItem(this, this.block, "School", "school", "Koop school | ", 100, 295))
        this.items.push(new ShopItem(this, this.block, "Building", "building", "Koop bedrijf | ", 300, 360))
        this.items.push(new ShopItem(this, this.block, "Farm", "seedling", "Koop farm | ", 800, 425))
        this.items.push(new ShopItem(this, this.block, "Factory", "industry", "Koop fabriek | ", 2400, 490))
        this.items.push(new ShopItem(this, this.block, "Laboratory", "flask", "Koop lab | ", 7500, 555))
        this.items.push(new ShopItem(this, this.block, "Country", "chess-king", "Koop land | ", 22500, 620))
        this.items.push(new ShopItem(this, this.block, "World", "globe", "Koop wereld | ", 85000, 685))
        //this.items.push(new ShopItem(this, this.block, "GalacticEmpire", "empire", "Koop intergalactisch rijk | ", 1000000000, 740))







    }

    update(){
        for(let item of this.items){
            item.update()
        }
    }
}