let memoryCards, firstCard, secondCard;
let isLockedForTurning = false;
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        loadCards();
        memoryCards.forEach(card => {
            card.addEventListener('click', flipToFront);
        });
    });
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function range(start, end) {
    return Array(end - start + 1).fill().map((_, ind) => start + ind);
}

function loadCards() {
    const firstCards = range(1, 12), secondCards = range(1, 12);
    shuffleArray(firstCards);
    shuffleArray(secondCards);
    const cardIndexes = firstCards.concat(secondCards);
    let html = '';
    cardIndexes.forEach(card => {
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
    memoryCards = document.querySelectorAll('.memory_card');
}

const flipToFront = e => {
    if (!isLockedForTurning) {
        const targetCard = e.target.parentElement.parentElement;
        if (targetCard !== firstCard) {
            targetCard.classList.add('is_flipped');
            if (firstCard === undefined) {
                firstCard = targetCard;
            } else if (secondCard === undefined) {
                secondCard = targetCard;
                checkMatch();
            }
        }
    }
}

const checkMatch = () => {
    firstCard.getAttribute('data-id') === secondCard.getAttribute('data-id') ?
        removeClickEventListener() : flipToBack();
}

const removeClickEventListener = () => {
    firstCard.removeEventListener('click', flipToFront);
    secondCard.removeEventListener('click', flipToFront);
}

const flipToBack = () => {
    isLockedForTurning = true;
    setTimeout(() => {
        firstCard.classList.remove('is_flipped');
        secondCard.classList.remove('is_flipped');
        resetCards();
    }, 1000);
}

const resetCards = () => {
    firstCard = secondCard = undefined;
    isLockedForTurning = false;
}