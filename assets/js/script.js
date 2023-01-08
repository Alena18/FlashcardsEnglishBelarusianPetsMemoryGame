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
        addFlipCount();
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
document.getElementById("restart").addEventListener("click", function () {
    window.location.reload();
    return false;
});
// Timer
const startTime = 2;
let time = startTime *60;
const timeTag = document.getElementById("timer");
let timerInterval;
startTimer();
//Start timer function
function startTimer() {
    timerInterval = setInterval(countTimer, 1000)
};
//Timer function
function countTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    //If minutes or seconds less then 10 format them as 09 etc
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    //Timer format
    timeTag.innerHTML = `${minutes} : ${seconds}`;
    time--;
    //Stop time after 00:00
    if (time < 0) {
        clearInterval(timerInterval);
        timeOver();
    };

};
// Function to stop the timer
function timeOver() {
    cards.forEach(card => {
        card.classList.add("disable");
    });
}
//Count how many time the pair of the cards flip
let flipCount = 0;
let flipCounter = document.getElementById("flips");

function addFlipCount(){
    flipCount +=1;
    flipCounter.innerText = flipCount;
};
