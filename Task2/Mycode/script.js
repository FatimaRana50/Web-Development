// Get all the elements we need
const gameArea = document.getElementById("gameArea");
const arrow = document.getElementById("arrow");
const target = document.getElementById("target");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const shootBtn = document.getElementById("shootBtn");
const restartBtn = document.getElementById("restartBtn");

// Game variables
let score = 0;
let timeLeft = 30; 
let gameOver = false;
let targetSpeed = 50; 
let targetDirection = 1; 

// Intervals
let targetInterval;
let timerInterval;


function moveTarget() {
  if (gameOver) return;
  
 
  const currentTop = parseInt(target.style.top) || 50;
  
  
  let newTop = currentTop + (3 * targetDirection); 
  

  const maxY = gameArea.clientHeight - target.clientHeight;
  
  if (newTop <= 0) {
    newTop = 0;
    targetDirection = 1; 
  } else if (newTop >= maxY) {
    newTop = maxY;
    targetDirection = -1; 
  }
  
 
  target.style.top = newTop + "px";
}


function startTargetMovement() {
  targetInterval = setInterval(moveTarget, targetSpeed);
}


function shootArrow() {
  if (gameOver) return;
  
 
  arrow.style.display = "block";
  arrow.style.left = "40px";
  
 
  const bowTop = 197; 
  
  
  let arrowPosition = 40;
  
  const shootInterval = setInterval(() => {
    arrowPosition += 15; 
    arrow.style.left = arrowPosition + "px";
    
   
    checkCollision();
    
    
    if (arrowPosition > gameArea.clientWidth) {
      clearInterval(shootInterval);
      arrow.style.display = "none";
    }
  }, 30);
}


function checkCollision() {
  const arrowRect = arrow.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  

  if (
    arrowRect.right > targetRect.left &&
    arrowRect.left < targetRect.right &&
    arrowRect.bottom > targetRect.top &&
    arrowRect.top < targetRect.bottom
  ) {
    updateScore();
    arrow.style.display = "none";
  }
}


function updateScore() {
  score++;
  scoreText.textContent = score;
  
  
  increaseDifficulty();
}


function increaseDifficulty() {
  if (score % 3 === 0 && targetSpeed > 20) {
    targetSpeed -= 5; 
    clearInterval(targetInterval);
    startTargetMovement();
  }
}

// Start the countdown timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timeText.textContent = timeLeft;
    
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// End the game
function endGame() {
  gameOver = true;
  clearInterval(targetInterval);
  clearInterval(timerInterval);
  alert("Game Over! Your final score: " + score);
}


function restartGame() {
  score = 0;
  timeLeft = 30;
  gameOver = false;
  targetSpeed = 50;
  targetDirection = 1;
  
 
  scoreText.textContent = score;
  timeText.textContent = timeLeft;
  

  clearInterval(targetInterval);
  clearInterval(timerInterval);
  
 
  target.style.right = "50px";
  target.style.top = "170px"; 
  
  // Hide arrow
  arrow.style.display = "none";
  
  // Start game
  startTargetMovement();
  startTimer();
}


shootBtn.addEventListener("click", shootArrow);
restartBtn.addEventListener("click", restartGame);


restartGame(); 