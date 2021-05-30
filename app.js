// Selecting Document Elements

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const tries = document.getElementById('scoreboard');
const startOverlay = document.getElementById('overlay');
const h2 = document.querySelector('.title');
const startButton = document.querySelector('a.btn__reset');

//initialize missed variable to 0

let missed = 0;

//start game event listener - hides start overlay once start button is clicked

startButton.addEventListener('click',() => {
    startOverlay.style.display = 'none';
});

//phrases to be used in the game
const phrases = [
    "THIS APP IS MADE WITH JAVASCRIPT", 
    "HOUSTON WE HAVE A PROBLEM",
    "MAY THE FORCE BE WITH YOU",
    "HASTA LA VISTA BABY",
    "TO INFINITY AND BEYOND",
    "SEIZE THE DAY BOYS"
];


//random phrase pick function, chooses random item from an array and breaks it's characters into a separate array
function getRandomPhraseAsArray(arr){
    phrasePicked = arr[Math.floor(Math.random() * arr.length)];
    let splitChars = [];
    for(let i = 0; i < phrasePicked.length; i++) {
        let newCharacter = phrasePicked[i];
        splitChars.push(newCharacter);
    };

    return splitChars;
};


//setting a game display: addPhraseToDisplay function

function addPhraseToDisplay(arr){
    const phraseUl = document.querySelector('#phrase ul');
    for(let i = 0; i < arr.length; i++){
        const li = document.createElement('li')
        li.textContent = arr[i]
        phraseUl.appendChild(li);
        if(li.textContent !== ' '){
            li.className = "letter";
        } else {
            li.className = "space";
        };
    };
};

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 

//check letter function


const letters = document.getElementsByClassName('letter');

function checkLetter(btn){   
    let letterClicked = btn.textContent.toUpperCase();
    let correctAnswer = false;
    for(let i = 0; i < letters.length; i++){
        if(letters[i].textContent === letterClicked){
            letters[i].className = "letter show";
            correctAnswer = letters[i];
        }
    };
    return correctAnswer;
};

//check win function

function checkWin(){
    let correctLetters = document.getElementsByClassName('show');
    let correctTotal = correctLetters.length;
    let lettersTotal = letters.length;
    if(lettersTotal === correctTotal){
        startOverlay.className = "win";
        startOverlay.style.display = "flex";
        h2.textContent = "Congrats! You've won the game!"

    } else if (missed >= 5){
        startOverlay.className = "lose";
        startOverlay.style.display = "flex";
        h2.textContent = "Sorry, you've lost the game..."
    };
    startButton.textContent = "Start a new game";
};

//event listener for the keyboard

qwerty.addEventListener('click', (e) => {
    let target = e.target;
    if(target.tagName === "BUTTON"){
        target.className = "chosen";
        target.setAttribute("disabled", "true");
        let letterFound = checkLetter(target);
        if (letterFound === false){
            let ol = tries.firstElementChild;
            let li = ol.children;
            ol.removeChild(li[0]);
            missed += 1
        };
    };
    checkWin();
});








