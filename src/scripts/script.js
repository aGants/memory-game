const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

cards.forEach(card => card.addEventListener('click', flipCard))

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle('flip');
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
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
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    lockBoard = false;
  }, (1000));
}
