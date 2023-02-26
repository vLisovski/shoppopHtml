
class Card {

    #title;
    #text;
    #imgUrl;

    constructor(Title, Text, ImgUrl) {
        this.#title = Title;
        this.#text = Text;
        this.#imgUrl = ImgUrl;
    }

    getTitle() {
        return this.#title;
    }

    getText() {
        return this.#text;
    }

    getImgUrl() {
        return this.#imgUrl;
    }
}

async function getCards() {

    let response = await fetch("http://localhost:8080/shop");
    let cards;
    if (response.ok) {
        cards = await response.json();
    }

    return cards;
}

function drawCardsOnCardField(cardField, cards) {

    let html = "";
    let counter = 0;
    html += `<div class="card-group">`;

    let arrayCards = [];

    cards.forEach(item=>{
        arrayCards.push(new Card(item.title,item.text,item.imgUrl));
    })

    console.log("arrayCards:")
    console.log(arrayCards);
    console.log("arrayCardsEnd")

    arrayCards.forEach(card => {
        if (counter === 3) {
            html += `</div>`;
            html += `<div class="card-group">`;
            counter=0;
        }

        html += `<div class="card m-2">`;
        html += `<img src="${card.getImgUrl()}" alt="Фото товара" class="card-img-top" height="300"> 
            <div class="card-body"> 
            <h5 class="card-title">${card.getTitle()}</h5> 
            <p class="card-text">${card.getText()}</p> 
            </div> 
            <div class="card-footer"> 
            <button class="rounded"> 
            <h6>Купить</h6> 
            </button> 
            <button class="rounded"> 
            <h6>В избранное</h6>
            </button> 
            </div>`;
        html += `</div>`;
        counter++;
    });

    html += `</div>`;
    cardField.innerHTML = html;
}

let cardField = document.getElementById("card_field");

window.onload = async function () {
    let cards = await getCards();
    console.log(cards)
    drawCardsOnCardField(cardField, cards);
};
