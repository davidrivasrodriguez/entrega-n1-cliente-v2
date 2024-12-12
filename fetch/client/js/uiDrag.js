// Obj// Objeto que maneja la funcionalidad de arrastrar y soltar
export const uiDrag = {
    // Método para inicializar la funcionalidad de arrastrar y soltar
    init: (dropZones, notes) => {
        document.querySelectorAll(dropZones).forEach((zone) => {
            zone.addEventListener("drop", async (event) => {
                event.preventDefault();
                try {
                    const cardId = event.dataTransfer.getData("text/plain");
                    const card = document.getElementById(cardId);

                    if (zone.id === card.dataset.suit) {
                        const rect = zone.getBoundingClientRect();
                        const offsetX = event.clientX - rect.left;
                        const offsetY = event.clientY - rect.top;

                        card.style.position = "absolute";
                        card.style.left = offsetX - (card.offsetWidth / 2) + "px";
                        card.style.top = offsetY - (card.offsetHeight / 2) + "px";

                        if (!zone.contains(card)) {
                            zone.appendChild(card);
                        }

                        // Enviar la posición de la carta al servidor
                        const response = await fetch(`http://localhost:3000/api/cards/${cardId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: cardId,
                                suit: card.dataset.suit,
                                left: card.style.left,
                                top: card.style.top
                            })
                        });

                        if (!response.ok) {
                            throw new Error('Failed to update card position');
                        }
                    }
                } catch (error) {
                    console.error('Error handling drop event:', error);
                    alert('Failed to handle drop event. Please try again.');
                }
            });

            zone.addEventListener("dragover", (event) => {
                event.preventDefault();
            });
        });

        document.querySelectorAll(notes).forEach((note) => {
            note.setAttribute("draggable", "true");
            note.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("text/plain", event.target.id);
            });
        });

        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.addEventListener("drop", (event) => {
            event.preventDefault();
            try {
                const cardId = event.dataTransfer.getData("text/plain");
                const card = document.getElementById(cardId);

                card.style.position = "relative";
                card.style.left = "0px";
                card.style.top = "0px";

                if (!cardsContainer.contains(card)) {
                    cardsContainer.appendChild(card);
                }
            } catch (error) {
                console.error('Error handling drop event in cards container:', error);
                alert('Failed to handle drop event in cards container. Please try again.');
            }
        });

        cardsContainer.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
    }
}