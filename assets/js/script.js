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


}

//Add event listener to every card
cards.forEach(card => {
    card.addEventListener("click", flippedCard);
})