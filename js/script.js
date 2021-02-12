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
// number of wrong guesses made
let wrongGuesses = 0;
// number of wrong guesses left before losing
let wrongGuessesLeft = 6;
// number of correct letters
let correctLetters = 0;
// DOM-node: hangman image
const hangmanImgEl = document.querySelector("#hangman");
// DOM-node: where messages show up
const msgHolderEl = document.querySelector("#message");
// DOM-node: button to start game
const startGameBtnEl = document.querySelector("#startGameBtn");
// DOM-node: message element
const messageEl = document.querySelector("#message");
// DOM-nodeList: letter buttons
const letterButtonEls = document.querySelectorAll("#letterButtons button");
// DOM-nodeList: letter boxes
const letterBoxEls = document.querySelectorAll("#letterBoxes li");
// DOM-node: letter box container
const letterBoxContainerEl = document.querySelector("#letterBoxes ul");

// call function pageInit when page loads
window.onload = pageInit;

// callback function with event listener for letter buttons
// that calls other functions
function pageInit() {
  for (const button of letterButtonEls) {
    button.addEventListener("click", letterButtonClickHandler);
  }
  setButtonsDisabledStatus(true);
}

// callback function for clicking letter buttons
// disable clicked button
// sends the value of the letter button to doGuess()
function letterButtonClickHandler(event) {
  const clickedLetter = event.target;
  clickedLetter.disabled = true;
  doGuess(clickedLetter.value);
}

// function that is called when player guesses
// the letter argument is passed down to function isLetterInWord()
// which returns the aray letterIndices that is then stores in a variable
// the number returned in the array is equal to the position of the
// correctly guessed letter in the word
// (e.g. for guessing "F" in "KAFFE", the array returns [2, 3]) 
function doGuess(letter) {
  const letterPosition = isLetterInWord(letter);
  if (letterPosition.length > 0) { // if the array is longer than 0 the letter is correct
    fillLetterBox(letterPosition, letter);
    correctLetters += letterPosition.length; // saves new number of correct letters
    if (correctLetters === selectedWord.length) { // if the correctly guessed letter number are equal to the length of the selected word, player wins
      win();
    }
  } else {
    ++wrongGuesses; // increment number of wrong guesses made
    hangmanImage(); // update the hangman image
    if (wrongGuesses <= 5) {
      --wrongGuessesLeft; // decrement number of wrong guesses done
      messageEl.textContent = `Du har ${wrongGuessesLeft} felgissningar kvar`;
    } else {
      lose();
    }
  }
}

// function to change the hangman image
function hangmanImage() {
  const imgSrcName = `images/h${wrongGuesses}.png`;
  hangmanImgEl.setAttribute("src", imgSrcName);
}

// function that is called when player wins
function win() {
  setButtonsDisabledStatus(true);
  startGameBtnEl.textContent = "Starta om spelet";
  messageEl.textContent = "Yey du vann!";
}

// function that is called when player loses
function lose() {
  setButtonsDisabledStatus(true);
  remainingLetters();
  startGameBtnEl.textContent = "Starta om spelet";
  messageEl.textContent = "Du förlorade!";
}

// function to fill out letter boxes with correct letter
// loops through array of letter positions
// connect the number element to the position in array w letter boxes
// change value of input in letterbox to the guessed letter
function fillLetterBox(guessedLetterPosition, guessedLetter) {
  for (let i = 0; i < guessedLetterPosition.length; i++) {
    const position = guessedLetterPosition[i];
    const box = letterBoxEls[position];
    box.firstElementChild.value = guessedLetter;
  }
}

// function to check if and where letter excist in selected word
// returns empty array if letter do not excist
function isLetterInWord(letter) {
  const letterIndices = [];
  for (let i = 0; i < selectedWord.length; i++) {
    if (letter == selectedWord[i]) {
      letterIndices.push(i);
    }
  }
  return letterIndices;
}

// function to fill out remaining letters when player lost
function remainingLetters() {
  for (let i = 0; i < selectedWord.length; i++) {
    const box = letterBoxEls[i];
    if (box.firstElementChild.value == "\xa0") {
      const letter = selectedWord[i];
      box.firstElementChild.value = letter;
    }
  }
}

// function for enabling and disabling all letter buttons
// isDisabled = boolean
const setButtonsDisabledStatus = (isDisabled) => letterButtonEls.forEach(btn => btn.disabled = isDisabled)
  
//   for (let i = 0; i < letterButtonEls.length; i++) {
//     letterButtonEls[i].disabled = isDisabled;
//   }
// }

// function for creating letter boxes
// for every letter in the selected word, loop through:
// create a new <li>-element containing a <input>
// use .appendChild() to add the new element to letterBoxEls
// then set letterBoxEls again so it's updated
function createLetterBoxes(amount) {
  for (let i = 0; i < amount; i++) {
    const newLiEl = document.createElement("LI");
    newLiEl.innerHTML = '<input type="text" disabled value="&nbsp;"/>';
    letterBoxContainerEl.appendChild(newLiEl);
  }
  letterBoxEls = document.querySelectorAll("#letterBoxes li");
}

// function to generate a random word
const generateRandomWord = (arr) => {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
}

// event listener for start button
startGameBtnEl.addEventListener("click", startGame);

// callback function for start button event listener
function startGame() {
  setButtonsDisabledStatus(false);
  letterBoxEls.forEach((el) => el.remove()); // delete old letter boxes
  messageEl.textContent = ""; // delete old messages
  selectedWord = generateRandomWord(wordList).toUpperCase();
  const selectedWordLength = selectedWord.length;
  createLetterBoxes(selectedWordLength);
  wrongGuessesLeft = 6; // reset guesses left
  wrongGuesses = 0; // delete old guesses
  correctLetters = 0; // reset correct letter count
  hangmanImage(); // update hangman image
}
