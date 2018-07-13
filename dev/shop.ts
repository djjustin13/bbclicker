class Shop{
    private block: Block
    
    public clickers:Clicker[] = []
    private items:ShopItem[] = []
    public sound:any

    constructor(b:Block){
        this.block = b

        let shop = document.createElement("p")
        shop.innerHTML = "Studiepunten shop"
        shop.classList.add("shopTitle")
        document.body.appendChild(shop)

        this.sound = new Howl({
            src: ['sounds/money.mp3']
        })


        this.items.push(new ShopItem(this, this.block, "Student", "user", "Koop student | ", 1, 35))
        this.items.push(new ShopItem(this, this.block, "Peercoach", "user-graduate", "Koop peercoach | ", 5, 90))
        this.items.push(new ShopItem(this, this.block, "Group", "users", "Koop klas | ", 10, 145))
        this.items.push(new ShopItem(this, this.block, "Teacher", "user-tie", "Koop docent | ", 25, 200))
        this.items.push(new ShopItem(this, this.block, "School", "school", "Koop school | ", 100, 255))
        this.items.push(new ShopItem(this, this.block, "Building", "building", "Koop bedrijf | ", 300, 310))
        this.items.push(new ShopItem(this, this.block, "Farm", "seedling", "Koop farm | ", 800, 365))
        this.items.push(new ShopItem(this, this.block, "Factory", "industry", "Koop fabriek | ", 2400, 420))
        this.items.push(new ShopItem(this, this.block, "Laboratory", "flask", "Koop lab | ", 7500, 475))
        this.items.push(new ShopItem(this, this.block, "Country", "chess-king", "Koop land | ", 22500, 530))
        this.items.push(new ShopItem(this, this.block, "World", "globe", "Koop wereld | ", 85000, 585))
        //this.items.push(new ShopItem(this, this.block, "GalacticEmpire", "empire", "Koop intergalactisch rijk | ", 1000000000, 740))

    }

    update(){
        for(let item of this.items){
            item.update()
        }
    }

}