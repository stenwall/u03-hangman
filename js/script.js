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
// DOM-nod: knappen som du startar spelet med
let startGameBtnEl = document.querySelector('#startGameBtn');

// Array av DOM-noder: Knapparna för bokstäverna
let letterButtonEls = document.querySelectorAll("#letterButtons button");

let letterBoxEls; // Array av DOM-noder: Rutorna där bokstäverna ska stå

// function to generate random word:
function generateRandomWord(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
}

// Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let selectedWord = generateRandomWord(wordList);
console.log(letterButtonEls);

let guesses = 0; // Number: håller antalet gissningar som gjorts
let hangmanImg; // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl; // DOM-nod: Ger meddelande när spelet är över




// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på


