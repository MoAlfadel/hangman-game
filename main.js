const lettersDisplay = document.getElementById("letters");
let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArr = Array.from(letters);
let catDisplay = document.querySelector(".cat-display");

// create all the letters Elements
lettersArr.forEach((letter) => {
    let span = document.createElement("span");
    let text = document.createTextNode(letter);
    span.append(text);
    span.classList.add("letter-box", "letter");
    lettersDisplay.append(span);
});

let words = {
    programming: [
        "php",
        "javascript",
        "go",
        "scala",
        "fortran",
        "r",
        "mysql",
        "python",
    ],
    movies: [
        "Prestige",
        "Inception",
        "Parasite",
        "Interstellar",
        "Whiplash",
        "Memento",
        "Coco",
        "Up",
    ],
    people: [
        "Albert Einstein",
        "Hitchcock",
        "Alexander",
        "Cleopatra",
        "Mahatma Ghandi",
    ],
    countries: ["Syria", "Palestine", "Yemen", "Sudan", "Bahrain", "Qatar"],
};
// select random Word
let cats = Object.keys(words);

// random cat (key from the object )
let randomCat = cats[randomIndex(cats)];

let randomCatWords = words[randomCat];
let theWord = randomCatWords[randomIndex(randomCatWords)].toLowerCase();
console.log(`${theWord} => ${randomCat}`);
catDisplay.textContent = randomCat;

function randomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
}

//create letter Guess letters
const lettersGuessBox = document.getElementById("lettersGuess");
const theWordLettersArr = theWord.toLowerCase().split("");
theWordLettersArr.forEach((letter) => {
    let wantedLetterContainer = document.createElement("div");
    let span = document.createElement("span");
    let text = document.createTextNode(letter);
    span.append(text);
    if (letter === " ") {
        span.classList.add("space");
        lettersGuessBox.append(span);
    } else {
        span.classList.add("letter-box", "wanted");
        wantedLetterContainer.classList.add("wanted-letter-container");
        wantedLetterContainer.append(span);
        lettersGuessBox.append(wantedLetterContainer);
    }
});

// play
let wrongAttempts = 0;
let gameEnd = false;
let result = false;
let allLettersBtns = document.querySelectorAll(".letter");
allLettersBtns.forEach((letter) => {
    letter.addEventListener("click", () => {
        if (!gameEnd) {
            letter.classList.add("clicked");
            if (check(letter) === false) {
                // not found the letter in the word
                wrongAttempts++;
                console.log(`the warong ${wrongAttempts}`);
                draw();
                // check of a player lost
                if (wrongAttempts >= 9) {
                    gameEnd = true;
                }
            } else {
                // found the letter
                // check if a player  win
                if (document.querySelectorAll(".wanted").length === 0) {
                    gameEnd = true;
                    result = true;
                }
            }
            if (gameEnd) {
                setTimeout(popupDisplay, 1000, result);
            }
        }
    });
});

// // click in wanted letter status
let drawContainer = document.getElementById("hangmanDraw");
// for (let i = 0; i < drawContainer.children.length; i++) {
//     drawContainer.children[i].style.display = "none";
// }

// check the clicked letters
function check(clickedLetter) {
    let playStatus = false;
    document.querySelectorAll(".wanted").forEach((wantedLetterSpan) => {
        if (wantedLetterSpan.textContent === clickedLetter.textContent) {
            playStatus = true;
            wantedLetterSpan.classList.remove("wanted");
            wantedLetterSpan.classList.add("founded");

            let changedIndex = theWordLettersArr.indexOf(
                clickedLetter.textContent.toLowerCase()
            );
            theWordLettersArr.splice(changedIndex, 1);
        }
    }); //end forEach
    return playStatus;
    // console.log(theWordLettersArr);
}

let draw = () => {
    drawContainer.children[wrongAttempts - 1].style.display = "block";
};

let popupDisplay = (result) => {
    let div = document.createElement("div");
    let text;
    if (result) {
        text = document.createTextNode(
            `Game Over , You win, the Word is ${theWord}`
        );
    } else {
        text = document.createTextNode(
            `Game Over , You lose , the Word is ${theWord}`
        );
        document.querySelectorAll(".wanted").forEach((letter) => {
            letter.classList.add("not-selected");
        });
    }
    div.append(text);
    div.classList.add("popup");
    let closePopUP = document.createElement("div");
    closePopUP.classList.add("close", "active");
    div.appendChild(closePopUP);
    document.body.append(div);
    closePopUP.addEventListener("click", () => {
        div.style.display = "none";
    });
};
