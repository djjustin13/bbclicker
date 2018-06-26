# Building Block Clicker


## Spelen!
#### How to play?
Heb jij ook moeite om al die buildingblocks te verzamelen? Moeten er nog aardig wat studiepunten bij komen? Train je skills in Building Block Clicker! Verzamel eerst 100 building blocks om een studiepunt te krijgen. Met je studiepunten kun je in de shop wat hulp kopen.

Hoeveel studiepunten kan jij verzamelen?

### Live demo
[Speel Buildinblock Clicker v1 online op bbclicker.nl!](http://bbclicker.nl)

### Installatie
Wil je het project lokaal spelen of de sourcecode bekijken? Clone de repository en run het project via je localhost. Ga naar localhost/.../docs om het spel te spelen.

## Checklist
- [x] Startscherm
- [x] Einscherm
- [x] Er zijn geen bugs

## Toelichting OOP

### Classes
Binnen mijn game gebruik ik voor alle elementen die ik op het scherm toon classes zodat de logiga in het object zit. Mijn classes heb ik zo opgezet dat ze hergebruikt kunnen worden. Onderstaande code is de class van het start scherm die een simpel logo tovoegd.

```javascript
class StartScreen{
    private game: Game

    constructor(g:Game) {
        this.game = g

        let logo = document.createElement("logo")
        logo.addEventListener("click",()=> this.nextLevel())
        document.body.appendChild(logo)
    }

    public update(): void {
    }

    private nextLevel(){
        this.game.showPlayScreen()
    }
}
```

### Encaptulation
Alle variabelen van de objecten houd ik zo veel mogelijk private, zodat deze allen vanuit het object zelf aangepast kunnen worden. Om wel te zorgen dat de objecten met elkaar kunnen communiceren, geef ik waardes mee wanneer ik een object aanmaak. In de constructor vang ik de meegegeven waardes op om deze te gebruiken binnen het object. In onderstaand voorbeeld geef ik met het aanmaken van een een shop item de tekst en de afstand tot de bovenkant van de pagina mee.

```javascript
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
```
### Composition
In mijn game maak ik veel gebruik van composition. Alle componenten in de game zijn classes. In onderstaande klassen diagram is te zien welke objecten welke objecten "hebben". Onderstaand een voorbeeld van de constructor class van mijn level. Hier worden nieuwe instansies aangemaakt van verschillende objecten.

```javascript
constructor(g:Game){
        this.game = g

        this.block = new Block()
        this.ui = new Ui(this, this.block)
        this.shop = new Shop(this.block)

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    }
```


### Inheritance
Bij coderen gaat het om efficentie. Het is zonde om veel regels code te moeten herhalen. Daarom maak ik gebruik van classes die ik extend om de eigenschappen en functies te kunnen hergebruiken.

De logica die de clickbots gebruiken zijn voor een groot deel hetzelfde. Ik maak op het moment van schrijven gebruik van Font Awesome om de iconen van de clickbots te tonen. Bij het aanmaken van een nieuwe clickbots wordt alle standaard logica van het Clicker object gebruikt. Later kunnen de clickbots nog wel aparte eigenschappen krijgen.

```javascript
class Clicker{
    protected block:Block
    protected element:HTMLElement
    private x:number
    private y:number

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

class Teacher extends Clicker{ 
    constructor(b:Block){
        super(b, "fa-user-tie")
        this.element.style.fontSize = "40px"
    } 

    public timer(){
        this.block.clickBlock(20)
    }
}
```

## Klassendiagram
bijgewerkt op 09-06-18
![diagram](https://preview.ibb.co/ggVyNo/bbc_diagram.jpg)

## Peer review
[Review op AeroPoint](https://github.com/Kirbman10/AeroPoint/issues/1#issue-331173499)

## Extra uitdagingen
- De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork
- Extra library Howler.js voor geluid in de game
