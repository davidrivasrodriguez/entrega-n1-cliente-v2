import { CardContainer } from './deckBuilder/cardContainer.js';

export const deckBuilder = {
    builder: async (deckType) => {
        const response = await fetch('js/deckBuilder/deckModels.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const deckModels = await response.json();
        const deckModel = deckModels[deckType];

        // Actualizar los nombres de los contenedores en base a que tipo de deck se esta utilizando
        const container = document.getElementById('container');
        container.innerHTML = '';
        deckModel.suits.forEach(suit => {
            const dropZone = document.createElement('div');
            dropZone.id = suit;
            dropZone.classList.add('drop-zone');
            dropZone.innerHTML = `<h2>${suit.charAt(0).toUpperCase() + suit.slice(1)}</h2>`;
            container.appendChild(dropZone);
        });

        const cardContainer = new CardContainer('cards-container');
        cardContainer.buildDeck(deckModel);
    }
}