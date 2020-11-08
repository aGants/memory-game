const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

cards.forEach(card => card.addEventListener('click', flipCard))

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle('flip');
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  } else {
    secondCard = this;
    checkForMatch()
  }
}

function checkForMatch() {
  if (firstCard.dataset.name === secondCard.dataset.name) {
    disableCards()
  } else {
    unflipCards()
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, (1000));
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}