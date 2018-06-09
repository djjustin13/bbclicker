# Building Block Clicker


## Spelen!

### Live demo
[Speel Buildinblock Clicker v1 online op bbclicker.nl!](http://bbclicker.nl)

### Installatie
Wil je het project lokaal spelen of de sourcecode bekijken? Clone de repository en run het project via je localhost. Ga naar localhost/.../docs om het spel te spelen.

## Checklist
- [x] Startscherm
- [x] Einscherm
- [ ] Er zijn geen bugs

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

### Inheritance
```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

## Klassendiagram

## Peer review

## Extra uitdagingen
