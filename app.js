/*
  GAME FUNCTION:
  - Player must guess a number between a min and max
  - Player gets a certain amount of guess
  - Notify player of guesses remaining
  - Notify the player of the correct answer if lose
  - Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI ELEMENTS
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');


// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener... click will reload after so clik
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
})

// Listen for guess
guessBtn.addEventListener('click', function (e) {
  // turn input guess into a integer/number
  let guess = parseInt(guessInput.value);
  console.log(guess);

  // validate our input. if no number less than 0, over 10
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
  }

  // Check if is winning number
  if (guess === winningNum) {
    // Game over - won
    gameOver(true, `${winningNum} is correct, YOU STILL GEY!!!`)


    // // Disable the input
    // guessInput.disabled = true;

    // // Make border green if won
    // guessInput.style.borderColor = 'green';

    // // let user know that they won
    // setMessage(`${winningNum} is correct! You Win!!!`, 'green')
  } else {
    // Wrong number - subtract
    guessesLeft -= 1;

    // check if any guesses left
    if (guessesLeft === 0) {
      // game over - lost

      // // Disable the input
      // guessInput.disabled = true;

      // // Make border red if lose
      // guessInput.style.borderColor = 'red';

      // // let user know that they won
      // setMessage(`Game Over, you lost. The correct number was ${winningNum}`, 'red')

      // replaces above code with this
      gameOver(false, `Lzzzzzzzzzzzz Game Over, you lost. The correct number was ${winningNum}`)


    } else {
      // Game continues - answer wrong

      // change border color
      guessInput.style.borderColor = 'red';

      // Clear Input
      guessInput.value = '';

      // Tell user its the wrong number
      setMessage(`Lzzzzzzzzzzzz ${guess} is not correct, ${guessesLeft} guesses left`, 'red');

    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  // if won queals true ?(then) we want that color to equal green :(else) we want that color to equal red
  won === true ? color = 'green' : color = 'red'

  // Disable the input
  guessInput.disabled = true;

  // Change border color
  guessInput.style.borderColor = color

  // change text color
  message.style.color = color;

  // Set message
  setMessage(msg)

  // Play Again
  guessBtn.value = 'Play Again';
  // not just = but append +=
  guessBtn.className += 'play-again';
}

// get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);

}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg
}
