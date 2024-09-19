// Game setup
const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');
const cardsArray = [
    '🍎', '🍎', '🍌', '🍌', 
    '🍇', '🍇', '🍉', '🍉',
    '🍒', '🍒', '🍍', '🍍',
    '🍓', '🍓', '🍑', '🍑'
];
let flippedCards = [];
let matchedCards = [];
let lockBoard = false;

// Shuffle cards function
function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
}

// Create card elements
function createCards() {
    shuffle(cardsArray);
    cardsArray.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${symbol}</div>
            </div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip card logic
function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return;  // Prevent double click on the same card

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check for a match
function checkForMatch() {
    lockBoard = true;
    const card1 = flippedCards[0].querySelector('.card-back').textContent;
    const card2 = flippedCards[1].querySelector('.card-back').textContent;

    if (card1 === card2) {
        matched();
    } else {
        unflipCards();
    }
}

// Handle matched cards
function matched() {
    flippedCards.forEach(card => card.classList.add('matched'));
    matchedCards.push(...flippedCards);
    resetBoard();
    checkForGameOver();
}

// Unflip cards if no match
function unflipCards() {
    setTimeout(() => {
        flippedCards.forEach(card => card.classList.remove('flipped'));
        resetBoard();
    }, 1000);
}

// Reset flipped cards and lock
function resetBoard() {
    [flippedCards, lockBoard] = [[], false];
}

// Check if the game is over
function checkForGameOver() {
    if (matchedCards.length === cardsArray.length) {
        setTimeout(() => {
            alert('Congratulations! You found all matches!');
        }, 500);
    }
}

// Initialize the game
createCards();
