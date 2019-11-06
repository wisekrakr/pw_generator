// Dom Elements
const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const numbersElement = document.getElementById("numbers");
const symbolsElement = document.getElementById("symbols");
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");

const randomFunction = {
  lower: getRandomLowerCase,
  upper: getRandomUpperCase,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// Handle the generate button event listen
generateElement.addEventListener("click", () => {
  const length = parseInt(lengthElement.value);
  const hasLower = lowercaseElement.checked;
  const hasUpper = uppercaseElement.checked;
  const hasNumber = numbersElement.checked;
  const hasSymbol = symbolsElement.checked;

  resultElement.innerText = generatePassword(
    length,
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol
  );
});

// Handle the clipboard button event listen
clipboardElement.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const pw = resultElement.innerText;

  if (!pw) {
    return;
  }

  textarea.value = pw;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

// Handle generating a password
function generatePassword(length, lower, upper, number, symbol) {
  // Init a password variable
  let pw = "";

  // Don't use unchecked types. Filter them out.
  const typesCount = lower + upper + number + symbol;
  const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(
    type => Object.values(type)[0]
  );

  if (typesCount === 0) {
    return "Use at least one type";
  }

  // Loop over the length and call the generator function on each type
  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach(type => {
      const functionName = Object.keys(type)[0]; // either lower, upper, number or symbol

      // Add new password to the initial password variable
      pw += randomFunction[functionName]();
    });
  }

  // Return the new password variable
  finalPassword = pw.slice(0, length);
  return finalPassword;
}

// Password Generator Functions
// Returns a lower case letter by random charcode between 97 - 122
function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Returns a upper case letter by random charcode between 65 - 91
function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Returns a random number between 0 - 9 by charcode between 48 - 67
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Returns a random symbol by charcode between 48 - 67
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
