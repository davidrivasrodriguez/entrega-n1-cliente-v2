import { uiDrag } from "./uiDrag.js";
import { deckBuilder } from "./deckBuilder.js";
import { playerDeck } from "./playerDeck.js";

const socket = io('http://localhost:3000');

const initializeDeck = async (deckType) => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';

    await deckBuilder.builder(deckType);
    // playerDeck.deckShuffle();
    uiDrag.init(".drop-zone", ".card", socket);

    // Cargar las posiciones de las cartas desde el servidor
    socket.emit('getGameState');
};

socket.on('gameState', (gameState) => {
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
});

// document.getElementById('deck-type').addEventListener('change', (event) => {
//     const deckType = event.target.value;
//     initializeDeck(deckType);
// });

initializeDeck('spanish');