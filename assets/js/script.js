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
    console.log(target.dataset.animal);
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
    const isEqual = cardOne.dataset.animal === cardTwo.dataset.animal;
    isEqual ? disCards() : unflip();

     
    // if(cardOne.dataset.animal === cardTwo.dataset.animal) {
    //     //Card are equal
    //     disCards();
    // } else {
    //     lockedCard = true;
    //     //Cards are not equal
    //     setTimeout (() => {
    //         cardOne.classList.remove("flipped");
    //         cardTwo.classList.remove("flipped");
    //         lockedCard = false;
    //     }, 1000)
    // }
};

//Disable cards function
const disCards = () => {
    cardOne.removerEventListener("click", flippedCard);
    cardTwo.removerEventListener("click", flippedCard);
};

//Unflip cards function
const unflip = () => {
    lockedCard = true;

    setTimeout (() => {
                cardOne.classList.remove("flipped");
                cardTwo.classList.remove("flipped");
                resetBoard();
            }, 1000)

};

//Resert game board when cards are not equal
const resetBoard = () => {
    // [hasFlipped, lockedCard] = [false, false];
    // [cardOne, cardTwo] = [null, null];
    
    hasFlipped = lockedCard =false;
    cardOne = cardTwo = null;
};
//Add event listener to every card
cards.forEach(card => {
    card.addEventListener("click", flippedCard);
    const randomShuffle = Math.floor(Math.random()* cards.length);
    card.style.order = randomShuffle;
});

// Restart game (reset button)
document.querySelector(".restart").addEventListener("click", function(){
    window.location.reload();
    return false;
});
