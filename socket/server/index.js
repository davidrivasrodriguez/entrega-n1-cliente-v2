import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Configuración inicial del servidor Express
const app = express();
const port = 3000;

// Crear servidor HTTP y Socket.io
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT']
    }
});

// Configuración CORS para permitir peticiones desde el cliente
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Middleware para procesar JSON
app.use(express.json());

// Estado global del juego - almacena posición de cada carta
let gameState = {
    cards: []
};

// API endpoints
app.get('/api/state', (req, res) => {
    res.json(gameState);
});

app.post('/api/state', (req, res) => {
    gameState = req.body;
    res.json({ success: true });
});

app.put('/api/cards/:cardId', (req, res) => {
    const { cardId } = req.params;
    const cardState = req.body;
    const cardIndex = gameState.cards.findIndex(card => card.id === cardId);

    if (cardIndex !== -1) {
        gameState.cards[cardIndex] = cardState;
    } else {
        gameState.cards.push(cardState);
    }

    res.json({ success: true });
});

// Manejar conexiones de Socket.io
io.on('connection', (socket) => {
    console.log('a user connected');

    // Enviar estado inicial del juego al cliente
    socket.emit('gameState', gameState);

    // Manejar actualización de la posición de una carta
    socket.on('updateCardPosition', (cardState) => {
        const cardIndex = gameState.cards.findIndex(card => card.id === cardState.id);

        if (cardIndex !== -1) {
            gameState.cards[cardIndex] = cardState;
        } else {
            gameState.cards.push(cardState);
        }

        // Emitir el estado actualizado a todos los clientes
        io.emit('gameState', gameState);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Iniciar el servidor
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});