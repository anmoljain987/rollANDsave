"use strict";
var player0 = document.querySelector(".player--0");
var player1 = document.querySelector(".player--1");
var score0 = document.getElementById("current--0");
var score1 = document.getElementById("current--1");
var ttlScore0 = document.getElementById("score--0");
var ttlScore1 = document.getElementById("score--1");
var newgame = document.querySelector(".btn--new");
var hold = document.querySelector(".btn--hold");
var roll = document.querySelector(".btn--roll");
var dice = document.querySelector(".dice");
var playerName0 = document.getElementById("name--0");
var playerName1 = document.getElementById("name--1");
var scores, currentScore, activePlayer, playing, blink;

resetValue();

function resetValue() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    var playerr1 = prompt("Enter 1st player name:");
    var playerr2 = prompt("Enter 2nd player name:");
    playerName0.textContent = playerr1;
    playerName1.textContent = playerr2;

    score0.textContent = 0;
    score1.textContent = 0;
    ttlScore0.textContent = 0;
    ttlScore1.textContent = 0;
    dice.classList.add("hidden");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
    if (blink) {
        clearInterval(blink);
        blink = 0;
    }
}

function rollDice() {
    if (playing) {
        var number = Math.trunc(Math.random() * 6) + 1;
        dice.classList.remove("hidden");
        dice.src = `dice-${number}.png`;
        if (number !== 1) {
            currentScore += number;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
}

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
}

function holdDice() {
    if (playing) {
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;
            dice.classList.add("hidden");

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("player--active");
            blink = setInterval(function() {
                document
                    .querySelector(`.player--${activePlayer}`)
                    .classList.toggle("player--winner");
            }, 1000);
        } else {
            switchPlayer();
        }
    }
}

newgame.addEventListener("click", resetValue);
roll.addEventListener("click", rollDice);
hold.addEventListener("click", holdDice);