let gameState = {
    cards: []
};

export const gameStateController = {
    getState: (req, res) => {
        res.json(gameState);
    },
    updateState: (req, res) => {
        gameState = req.body;
        res.json({ success: true });
    },
    updateCardPosition: (req, res) => {
        const { cardId } = req.params;
        const cardState = req.body;
        const cardIndex = gameState.cards.findIndex(card => card.id === cardId);

        if (cardIndex !== -1) {
            gameState.cards[cardIndex] = cardState;
        } else {
            gameState.cards.push(cardState);
        }

        res.json({ success: true });
    }
};