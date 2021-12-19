const startNewGame = document.getElementById('startNewGame');
const slider = document.getElementById('difficultyRange');
const menu = document.querySelector('.menu');
const maxAmountOfCards = 18;
let firstCard, secondCard, amountOfCards = 6, cardCounter = 0, turnsCounter = 0;
let isLockedForTurning = false;
let timerInterval, start;

function changeMenuVisibility(t) {
    t.classList.toggle('change');
    menu.classList.toggle('show_menu');
}

document.addEventListener('DOMContentLoaded', () => {
    loadCards();
});

startNewGame.addEventListener('click', loadCards);

slider.oninput = function () {
    amountOfCards = +this.value;
    loadCards();
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
    if (timerInterval) {
        stopTimer();
    }
    setDefaultValues();
    const cardRange = range(1, maxAmountOfCards);
    shuffleArray(cardRange);
    const firstPartOfDeck = cardRange.slice(0, amountOfCards);
    const secondPartOfDeck = firstPartOfDeck.slice();
    const deck = firstPartOfDeck.concat(secondPartOfDeck);
    shuffleArray(deck);
    let html = '';
    deck.forEach(card => {
        html += `
            <div class="memory_card">
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
    const memoryCards = document.querySelectorAll('.memory_card');
    memoryCards.forEach(card => {
        card.addEventListener('click', flipToFront);
    });
}

const flipToFront = e => {
    if (!timerInterval) {
        startTimer();
    }
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

function getImgSrc(card) {
    return card.getElementsByTagName('img')[1].getAttribute('src').replace(/(\D+)/g, '');
}

const checkMatch = () => {
    let src1 = getImgSrc(firstCard), src2 = getImgSrc(secondCard);
    src1 === src2 ? removeClickEventListener() : flipToBack();
    turnsCounter++;
    document.getElementById('turns').innerHTML = turnsCounter;
}

const removeClickEventListener = () => {
    firstCard.removeEventListener('click', flipToFront);
    secondCard.removeEventListener('click', flipToFront);
    cardCounter++;
    if (cardCounter === amountOfCards) {
        stopTimer();
    }
    resetCards();
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

function format(milliseconds, scale, modulo) {
    milliseconds = Math.floor(milliseconds / scale) % modulo;
    return milliseconds.toString().padStart(2, 0);
}

const startTimer = () => {
    start = Date.now();
    timerInterval = setInterval(function () {
        const milliseconds = Date.now() - start;
        document.getElementById('time').innerHTML =
            `${format(milliseconds, 60000, 60)}:${format(milliseconds, 1000, 60)}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function setDefaultValues() {
    document.getElementById('turns').innerHTML = '0';
    document.getElementById('time').innerHTML = '00:00';
    cardCounter = turnsCounter = 0;
    timerInterval = undefined;
}