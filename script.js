`use strict`;
// Selecting Element
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const score0El = document.querySelector(`#score--0`); // Score Label of player-0
const score1El = document.getElementById(`score--1`); // Score Label of player-1
const current0El = document.getElementById(`current--0`); // Current Label of player-0
const current1El = document.getElementById(`current--1`); // Current Label of player-1

const diceEl = document.querySelector(`.dice`); // Dice Image
const btnNew = document.querySelector(`.btn--new`);
const btnHold = document.querySelector(`.btn--hold`);
const btnRoll = document.querySelector(`.btn--roll`);

const nameLabel = document.querySelectorAll(`.name`);
const scoreLabel = document.querySelectorAll(`.score`);

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add(`hidden`);

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};
const colorChange = () => {
  for (let i = 0; i < nameLabel.length && scoreLabel.length; i++) {
    nameLabel[i].style.color = `#fff`;
    scoreLabel[i].style.color = `#fff`;
  }
};

// Dice Roll
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1- Generate random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    //2- Display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    //3-Cheak for rolled 1
    if (dice !== 1) {
      //Add dice to current score

      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});
console.log('hi');

//-----------------HOLD BUTTON-----------------
btnHold.addEventListener(`click`, function () {
  if (playing) {
    //1- Add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2- Cheak if the score is >= 100
    if (scores[activePlayer] >= 150) {
      colorChange();
      diceEl.classList.add(`hidden`);
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchPlayer();
    }
  }
});
//------------- New Button -------------------
btnNew.addEventListener(`click`, function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);

  playing = true;
  currentScore = 0;
  activePlayer = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  scores[0] = currentScore;
  scores[1] = currentScore;

  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
});
