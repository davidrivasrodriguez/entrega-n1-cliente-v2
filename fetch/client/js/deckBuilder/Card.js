// Clase que representa una carta
export class Card {
    constructor(id, suit, value, imageUrl) {
        this.id = id;
        this.suit = suit;
        // this.value = value;
        this.imageUrl = imageUrl;
    }

    // Método para crear el elemento HTML de la carta
    createCardElement() {
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = this.id;
        card.setAttribute('data-suit', this.suit);
        // card.setAttribute('data-value', this.value);
        // card.textContent = `${this.value}`;
        card.style.backgroundImage = `url(${this.imageUrl})`;
        card.style.backgroundSize = 'cover';
        return card;
    }
}