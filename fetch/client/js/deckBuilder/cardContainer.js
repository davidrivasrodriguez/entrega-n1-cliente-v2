import { Card } from './Card.js';

// Clase que representa un contenedor de cartas
export class CardContainer {
    // Constructor que inicializa el contenedor de cartas con el ID proporcionado
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    // Método para construir un mazo de cartas basado en el modelo de mazo proporcionado
    buildDeck(deckModel) {
        const { suits, cardsPerSuit, imageUrls } = deckModel;
        let cardNum = 0;

        // Iterar sobre cada palo del mazo
        suits.forEach(suit => {
            // Crear cartas para cada palo
            // for (let i = 1; i <= cardsPerSuit; i++) {
            //     cardNum++;
            //     const card = new Card(`card-${cardNum}`, suit, i, imageUrls[suit]);
            //     this.container.appendChild(card.createCardElement());
            // }

            // Crear una carta por cada palo (para pruebas)
            for (let i = 1; i <= 1; i++) {
                cardNum++;
                const card = new Card(`card-${cardNum}`, suit, i, imageUrls[suit]);
                this.container.appendChild(card.createCardElement());
            }
        });
    }
}