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
let startGameBtnEl = document.querySelector("#startGameBtn");
// event listener för startknappen
startGameBtnEl.addEventListener("click", () => {
  alert("hej");
})

// Array av DOM-noder: Knapparna för bokstäverna
let letterButtonEls = document.querySelectorAll("#letterButtons button");

// Array av DOM-noder: Rutorna där bokstäverna ska stå
let letterBoxEls = document.querySelectorAll("#letterBoxes > ul");

// function to generate random word:
function generateRandomWord(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
}

// Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let selectedWord = generateRandomWord(wordList);



// TESTA OM DET FUNKAR HÄR
console.log(letterBoxEls);

let guesses = 0; // Number: håller antalet gissningar som gjorts
let hangmanImg; // Sträng: sökväg till bild som kommer visas (och ändras) fel svar. t.ex. `/images/h1.png`

let msgHolderEl; // DOM-nod: Ger meddelande när spelet är över

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
// Funktion som körs när du trycker på bokstäverna och gissar bokstav
// Funktion som ropas vid vinst eller förlust, gör olika saker beroende tillståndet
// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på
