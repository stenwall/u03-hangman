// Variables that are needed in the global scope

// temp wordlist, making a longer one in seperate file later
const wordList = [
  "kaffe",
  "te",
  "mjölk",
  "glögg",
  "vin",
  "läsk",
  "soda",
  "juice",
  "vatten",
];
// save the randomly generated word
let selectedWord = null;
// number of guesses made
let guesses = 0;
// hangman image
let hangmanImg;
// DOM-node: where messages show up
let msgHolderEl = document.querySelector("#message");
// DOM-node: button to start game
let startGameBtnEl = document.querySelector("#startGameBtn");
// DOM-nodeList: letter buttons
let letterButtonEls = document.querySelectorAll("#letterButtons button");
// DOM-nodeList: letter boxes
let letterBoxEls = document.querySelectorAll("#letterBoxes li");
// DOM-node: letter box container
let letterBoxContainerEl = document.querySelector("#letterBoxes ul");

// delete letter boxes when new game starts
function clearLetterBoxes() {
  letterBoxContainerEl.innerHTML = "";
}

// create a new <li>-element containing a <input>
// Use .appendChild() to add the new element to letterBoxEls
function createLetterBoxes(amount) {
  for (let i = 0; i < amount; i++) {
    let newLiEl = document.createElement("LI");
    newLiEl.innerHTML = '<input type="text" disabled value="&nbsp;"/>';
    letterBoxContainerEl.appendChild(newLiEl);
  }
  letterBoxEls = document.querySelectorAll("#letterBoxes li");
  console.log(letterBoxEls);
}

// function to generate random word:
function generateRandomWord(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
}

// event listener for start button
startGameBtnEl.addEventListener("click", startGame);

// callback function for event listener
function startGame() {
  clearLetterBoxes();
  selectedWord = generateRandomWord(wordList);
  let selectedWordLength = selectedWord.length;
  createLetterBoxes(selectedWordLength);
}

// event lyssnaren ska kalla på bl a createLetterBoxes()
// 1.

// TESTA OM DET FUNKAR HÄR
// console.log(letterBoxEls);

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
