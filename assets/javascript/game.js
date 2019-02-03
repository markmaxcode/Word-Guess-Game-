
'use strict';

var selectableWords =           
    [
        "broadway",
        "wallstreet",
        "waterstreet",
        "harlem",
        "bronx",
        "maidenlane",
        "lowereastside",
        "centralpark",
        "pennstation",
        "grandcentral"
    ];

const maxTries = 10;            

var guessedLetters = [];        
var currentWordIndex;           
var guessingWord = [];          
var remainingGuesses = 0;       
var hasFinished = false;        
var wins = 0;                   

function resetGame() {
    remainingGuesses = maxTries;

    
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));
    console.log("currentWordIndex=" +  currentWordIndex + " selectableWords=" + selectableWords[currentWordIndex]);

    
    guessedLetters = [];
    guessingWord = [];

    
    document.getElementById("hangmanImage").src = "";

    
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }   

    
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    
    updateDisplay();
};


function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    
    
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    //
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};



function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".png";
};



function evaluateGuess(letter) {
    
    var positions = [];

    
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        console.log("currentWordIndex=" + currentWordIndex + " selectableWords[currentWordIndex][i]" + selectableWords[currentWordIndex][i]);
        if(selectableWords[currentWordIndex][i] === letter) { 
            console.log(" selectableWords[currentWordIndex][i]" + selectableWords[currentWordIndex][i] + " letter=" + letter);
            positions.push(i);
        }
    }

    
    if (positions.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
    } else {
        
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
};



function checkLoss()
{
    if(remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
}


function makeGuess(letter) {
    if (remainingGuesses > 0) {
        
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};



document.onkeydown = function(event) {
    
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key);
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};
