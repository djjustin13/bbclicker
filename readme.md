# Building Block Clicker


## Live demo
[Speel Buildinblock Clicker v1](http://bbclicker.nl)

## Checklist
[x] Startscherm
[] Einscherm
[] Er zijn geen bugs

## Toelichting OOP

### Classes
Binnen mijn game gebruik ik voor alle elementen die ik op het scherm toon classes zodat de logiga in het object zit. Mijn classes heb ik zo opgezet dat ze hergebruikt kunnen worden. Onderstaand heb ik de code van een eenvoudig object dat een HTML element aanmaakt en op het scherm toont.

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

### Encaptulation
```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

### Inheritance
```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

## Klassendiagram

## Peer review

## Extra uitdagingen
