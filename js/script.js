eventListeners();

function eventListeners() {
    window.addEventListener('DOMContentLoaded', () => {
        loadCards();
        cardFlip();
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

function loadCards() {
    const firstCards = range(1, 12), secondCards = range(1, 12);
    shuffleArray(firstCards);
    shuffleArray(secondCards);
    const cardsIndexes = firstCards.concat(secondCards);
    let html = '';
    cardsIndexes.forEach(card => {
        html += `
            <div class="memory_card" data-id="${card}">
                <div class="memory_card_front">
                    <img src="img/front_side.jpg" alt="Front side" width="450" height="600">
                </div>
                <div class="memory_card_back">
                    <img src="img/${card}.jpg" alt="Back side" width="450" height="600">
                </div>
            </div>
        `;
    });
    document.querySelector('.memory_cards').innerHTML = html;
}

function cardFlip(){
    const cards = document.querySelectorAll('.memory_card');
    cards.forEach(card => card.addEventListener('click', () => {
        card.classList.toggle('is_flipped');
    }));
}