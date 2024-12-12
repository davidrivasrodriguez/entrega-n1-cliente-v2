import { uiDrag } from "./uiDrag.js";
import { deckBuilder } from "./deckBuilder.js";
import { playerDeck } from "./playerDeck.js";

const initializeDeck = async (deckType) => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';

    await deckBuilder.builder(deckType);
    // playerDeck.deckShuffle();
    uiDrag.init(".drop-zone", ".card");

    // Cargar las posiciones de las cartas desde el servidor
    const response = await fetch('http://localhost:3000/api/state');
    const gameState = await response.json();

    gameState.cards.forEach(cardState => {
        const card = document.getElementById(cardState.id);
        if (card) {
            card.style.position = "absolute";
            card.style.left = cardState.left;
            card.style.top = cardState.top;

            const zone = document.getElementById(cardState.suit);
            if (zone && !zone.contains(card)) {
                zone.appendChild(card);
            }
        }
    });
};

// document.getElementById('deck-type').addEventListener('change', (event) => {
//     const deckType = event.target.value;
//     initializeDeck(deckType);
// });

initializeDeck('spanish');