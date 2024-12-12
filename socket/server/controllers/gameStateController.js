// Estado global del juego - almacena posición de cada carta
let gameState = {
    cards: []
};

// Controladores para manejar las solicitudes de la API
export const gameStateController = {
    // Obtener el estado actual del juego
    getState: (req, res, next) => {
        try {
            res.json(gameState);
        } catch (error) {
            next(error);
        }
    },
    // Actualizar el estado completo del juego
    updateState: (req, res, next) => {
        try {
            gameState = req.body;
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    },
    // Actualizar la posición de una carta específica
    updateCardPosition: (req, res, next) => {
        try {
            const { cardId } = req.params;
            const cardState = req.body;
            const cardIndex = gameState.cards.findIndex(card => card.id === cardId);

            if (cardIndex !== -1) {
                gameState.cards[cardIndex] = cardState;
            } else {
                gameState.cards.push(cardState);
            }

            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }
};