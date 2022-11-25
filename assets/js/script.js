/* jshint esversion: 11 */
const cards = document.querySelectorAll(".card");

let cardOne, cardTwo;
let hasFlipped = false;
let lockedCard = false; //Can't flip another card until previous cards action is completed

// Find the same card and leave it flipped
const flippedCard = e => {
    if (lockedCard) return;
    const target = e.target.parentElement;

    if (target === cardOne) return; // if you click the same card twice it stays open
    // it reacts as the same class while this card should flip back
    target.classList.add("flipped");

    //Get cards by one tag
      if (!hasFlipped) {
        //First click
        hasFlipped = true;
        cardOne = target;
    } else {
        //Second click
        hasFlipped = false;
        cardTwo = target;
        checkMatch();
    }
};

//Check the same card
const checkMatch = () => {
    let isEqual = cardOne.dataset.animal === cardTwo.dataset.animal;
    isEqual = isEqual ? disCards() : unflip();
};

//Disable cards function
const disCards = () => {
    cardOne.removeEventListener("click", flippedCard);
    cardTwo.removeEventListener("click", flippedCard);
};

//Unflip cards function
const unflip = () => {
    lockedCard = true;

    setTimeout(() => {
        cardOne.classList.remove("flipped");
        cardTwo.classList.remove("flipped");
        resetBoard();
    }, 2500);

};

//Resert game board when cards are not equal
const resetBoard = () => {
    hasFlipped = lockedCard = false;
    cardOne = cardTwo = null;
};
//Add event listener to every card
cards.forEach(card => {
    card.addEventListener("click", flippedCard);
    const randomShuffle = Math.floor(Math.random() * cards.length);
    card.style.order = randomShuffle;
});

// Restart game (reset button)
document.querySelector(".restart").addEventListener("click", function () {
    window.location.reload();
    return false;
});
