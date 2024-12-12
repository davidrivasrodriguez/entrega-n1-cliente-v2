import { Card } from './Card.js';

export class CardContainer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    buildDeck(deckModel) {
        const { suits, cardsPerSuit, imageUrls } = deckModel;
        let cardNum = 0;

        suits.forEach(suit => {
            // for (let i = 1; i <= cardsPerSuit; i++) {
            //     cardNum++;
            //     const card = new Card(`card-${cardNum}`, suit, i, imageUrls[suit]);
            //     this.container.appendChild(card.createCardElement());
            // }

            for (let i = 1; i <= 1; i++) {
                cardNum++;
                const card = new Card(`card-${cardNum}`, suit, i, imageUrls[suit]);
                this.container.appendChild(card.createCardElement());
            }
        });
    }
}