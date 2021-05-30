// Selecting Document Elements

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const tries = document.getElementById('scoreboard');
const startOverlay = document.getElementById('overlay');
const h2 = document.querySelector('.title');
const startButton = document.querySelector('a.btn__reset');
const letters = document.getElementsByClassName('letter');
const img = document.querySelector('img');
let ol = tries.firstElementChild;
let li = ol.children;


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

const phraseUl = document.querySelector('#phrase ul');

function addPhraseToDisplay(arr){
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
    startButton.textContent = "See results";
};

//event listener for the keyboard

qwerty.addEventListener('click', (e) => {
    let target = e.target;
    if(target.tagName === "BUTTON"){
        target.className = "chosen";
        target.setAttribute("disabled", "true");
        let letterFound = checkLetter(target);
        if (letterFound === false){
            ol.removeChild(li[0]);
            missed += 1
        };
    };
    checkWin();
});

// Function that resets hearts

function resetLives(){
    const remainderLives = li.length;
    for(let i = 0; i < remainderLives; i++){
        ol.removeChild(li[0])
    };
  
    for(let i = 0; i < 5 ; i++){
        newHeart = document.createElement('LI');
        newHeart.className = "tries"; 
        ol.appendChild(newHeart);
        li[i].appendChild(img.cloneNode(true))  
    }; 
    
};



// function that resets keyboard

function resetKeyboard(){
    const buttons = document.querySelectorAll('button');
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].className === 'chosen'){
            buttons[i].classList.remove('chosen');
        };
        buttons[i].removeAttribute('disabled');
    };

};


//function that resets the phrases

function resetPhrase(){
    const contents = phraseUl.children
    const contentsLength = contents.length
    for (let i = 0; i < contentsLength; i++){
        phraseUl.removeChild(contents[0]);
    };
    let newPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhrase);
};


//Function that resets the entire game;

function resetGame(){
    missed = 0
    resetLives();
    resetKeyboard();
    resetPhrase();
};