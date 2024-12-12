import { uiDrag } from "./uiDrag.js";
import { deckBuilder } from "./deckBuilder.js";
import { playerDeck } from "./playerDeck.js";

// Conectar al servidor de Socket.io
const socket = io('http://localhost:3000');

// Inicializar el mazo de cartas
const initializeDeck = async (deckType) => {
    try {
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';

        await deckBuilder.builder(deckType);
        // playerDeck.deckShuffle();
        uiDrag.init(".drop-zone", ".card", socket);

        // Cargar las posiciones de las cartas desde el servidor
        socket.emit('getGameState');
    } catch (error) {
        console.error('Error initializing deck:', error);
        alert('Failed to initialize deck. Please try again.');
    }
};

// Manejar el estado del juego recibido del servidor
socket.on('gameState', (gameState) => {
    try {
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
    } catch (error) {
        console.error('Error processing game state:', error);
        alert('Failed to process game state. Please try again.');
    }
});

// Manejar errores del servidor
socket.on('error', (error) => {
    console.error('Server error:', error);
    alert(`Server error: ${error.message}`);
});

// Inicializar el mazo de cartas al cargar la página
initializeDeck('spanish');