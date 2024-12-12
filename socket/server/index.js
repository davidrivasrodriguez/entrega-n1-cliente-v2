import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import apiRoutes from './routes/api.js';

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
app.use(cors());

// Middleware para procesar JSON
app.use(express.json());

// Estado global del juego - almacena posición de cada carta
let gameState = {
    cards: []
};

// API endpoints
app.use('/api', apiRoutes);

// Manejar conexiones de clientes
io.on('connection', (socket) => {

    // Enviar estado inicial del juego al cliente
    socket.emit('gameState', gameState);

    // Manejar solicitud de estado del juego
    socket.on('getGameState', () => {
        socket.emit('gameState', gameState);
    });

    // Manejar actualización de la posición de una carta
    socket.on('updateCardPosition', (cardState) => {
        try {
            const cardIndex = gameState.cards.findIndex(card => card.id === cardState.id);

            if (cardIndex !== -1) {
                gameState.cards[cardIndex] = cardState;
            } else {
                gameState.cards.push(cardState);
            }

            // Emitir el estado actualizado a todos los clientes
            io.emit('gameState', gameState);
        } catch (error) {
            console.error('Error updating card position:', error);
            socket.emit('error', { message: 'Failed to update card position' });
        }
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Iniciar el servidor
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});