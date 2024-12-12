import express from 'express';
import cors from 'cors';

// Configuración inicial del servidor Express
const app = express();
const port = 3000;

// Configuración CORS para permitir peticiones desde el cliente
app.use(cors());

// Middleware para procesar JSON
app.use(express.json());

// Estado global del juego - almacena posición de cada carta
let gameState = {
    cards: []
};

// Endpoint para obtener el estado actual del juego
app.get('/api/state', (req, res) => {
    // Obtener estado actual del juego
    res.json(gameState);
});

// Endpoint para actualizar el estado completo del juego
app.post('/api/state', (req, res) => {
    // Actualizar estado completo del juego
    gameState = req.body;
    res.json({ success: true });
});

// Endpoint para actualizar la posición de una carta específica
app.put('/api/cards/:cardId', (req, res) => {
    // Obtener el ID de la carta desde los parámetros de la URL
    const { cardId } = req.params;
    // Obtener el nuevo estado de la carta desde el cuerpo de la solicitud
    const cardState = req.body;
    // Buscar la carta en el estado actual del juego
    const cardIndex = gameState.cards.findIndex(card => card.id === cardId);

    if (cardIndex !== -1) {
        // Si la carta existe, actualizar su estado
        gameState.cards[cardIndex] = cardState;
    } else {
        // Si la carta no existe, agregarla al estado del juego
        gameState.cards.push(cardState);
    }

    // Responder con éxito
    res.json({ success: true });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});