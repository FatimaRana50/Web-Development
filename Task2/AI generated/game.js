// ============================================
// GAME STATE VARIABLES
// ============================================
const gameState = {
    score: 0,
    timeLeft: 60,
    gameOver: false,
    isArrowFlying: false,
    difficulty: 1,
    targetSpeed: 2000,
    targetSize: 100
};

// ============================================
// DOM ELEMENT SELECTION
// ============================================
const elements = {
    target: document.querySelector('#target'),
    arrow: document.querySelector('#arrow'),
    scoreDisplay: document.querySelector('#score'),
    timerDisplay: document.querySelector('#timer'),
    shootBtn: document.querySelector('#shootBtn'),
    restartBtn: document.querySelector('#restartBtn'),
    gameOverScreen: document.querySelector('#gameOver'),
    finalScoreDisplay: document.querySelector('#finalScore'),
    gameArea: document.querySelector('#gameArea'),
    difficultyDisplay: document.querySelector('#difficulty'),
    crosshair: document.querySelector('#crosshair')
};

// ============================================
// TIMER MANAGEMENT
// ============================================
let timerInterval = null;

const startTimer = () => {
    timerInterval = setInterval(() => {
        if (gameState.timeLeft > 0 && !gameState.gameOver) {
            gameState.timeLeft--;
            updateTimerDisplay();
            
            if (gameState.timeLeft === 0) {
                endGame();
            }
        }
    }, 1000);
};

const updateTimerDisplay = () => {
    elements.timerDisplay.textContent = gameState.timeLeft;
    
    // Add warning effect when time is low
    if (gameState.timeLeft <= 10) {
        elements.timerDisplay.style.color = '#ff3366';
        elements.timerDisplay.style.animation = 'pulse 0.5s ease-in-out infinite';
    }
};

const stopTimer = () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
};

// ============================================
// SCORE MANAGEMENT
// ============================================
const updateScore = () => {
    gameState.score++;
    elements.scoreDisplay.textContent = gameState.score;
    
    // Add score animation
    elements.scoreDisplay.style.transform = 'scale(1.3)';
    setTimeout(() => {
        elements.scoreDisplay.style.transform = 'scale(1)';
    }, 200);
    
    // Check for difficulty increase
    if (gameState.score % 5 === 0) {
        increaseDifficulty();
    }
};

// ============================================
// DIFFICULTY SYSTEM
// ============================================
const increaseDifficulty = () => {
    gameState.difficulty++;
    
    // Increase speed (reduce interval time)
    gameState.targetSpeed = Math.max(800, gameState.targetSpeed - 200);
    
    // Decrease target size
    gameState.targetSize = Math.max(50, gameState.targetSize - 5);
    
    // Update difficulty display
    elements.difficultyDisplay.textContent = `Level ${gameState.difficulty}`;
    elements.difficultyDisplay.style.animation = 'none';
    setTimeout(() => {
        elements.difficultyDisplay.style.animation = 'blink 1s ease-in-out infinite';
    }, 10);
    
    // Apply new size to target
    elements.target.style.width = `${gameState.targetSize}px`;
    elements.target.style.height = `${gameState.targetSize}px`;
    
    // Restart movement with new speed
    stopTargetMovement();
    startTargetMovement();
};

// ============================================
// TARGET MOVEMENT
// ============================================
let targetMovementInterval = null;

const moveTarget = () => {
    const gameAreaRect = elements.gameArea.getBoundingClientRect();
    const targetRect = elements.target.getBoundingClientRect();
    
    // Keep target on the right side of the screen
    const fixedX = gameAreaRect.width - gameState.targetSize - 80; // Fixed X position on right
    
    // Calculate maximum Y positions (account for target size and safe zones)
    const maxY = gameAreaRect.height - gameState.targetSize - 100; // Keep away from controls
    const minY = 50;
    
    // Generate random Y position only
    const newY = Math.random() * (maxY - minY) + minY;
    
    // Apply position with smooth transition (only Y changes)
    elements.target.style.left = `${fixedX}px`;
    elements.target.style.top = `${newY}px`;
};

const startTargetMovement = () => {
    moveTarget(); // Initial position
    targetMovementInterval = setInterval(moveTarget, gameState.targetSpeed);
};

const stopTargetMovement = () => {
    if (targetMovementInterval) {
        clearInterval(targetMovementInterval);
        targetMovementInterval = null;
    }
};

// ============================================
// ARROW SHOOTING MECHANICS
// ============================================
const shootArrow = () => {
    if (gameState.isArrowFlying || gameState.gameOver) {
        return;
    }
    
    gameState.isArrowFlying = true;
    elements.shootBtn.disabled = true;
    
    // Get arrow starting position
    const arrowStartY = elements.gameArea.getBoundingClientRect().height / 2;
    elements.arrow.style.top = `${arrowStartY}px`;
    
    // Show arrow and trigger animation
    elements.arrow.classList.add('shooting');
    
    // Check for collision during flight
    const checkCollisionInterval = setInterval(() => {
        checkCollision();
    }, 10);
    
    // Arrow flight duration
    setTimeout(() => {
        clearInterval(checkCollisionInterval);
        elements.arrow.classList.remove('shooting');
        gameState.isArrowFlying = false;
        elements.shootBtn.disabled = false;
    }, 1000);
};

// ============================================
// COLLISION DETECTION
// ============================================
const checkCollision = () => {
    const arrowRect = elements.arrow.getBoundingClientRect();
    const targetRect = elements.target.getBoundingClientRect();
    
    // Check if arrow intersects with target
    const isColliding = !(
        arrowRect.right < targetRect.left ||
        arrowRect.left > targetRect.right ||
        arrowRect.bottom < targetRect.top ||
        arrowRect.top > targetRect.bottom
    );
    
    if (isColliding && gameState.isArrowFlying) {
        handleHit();
    }
};

const handleHit = () => {
    gameState.isArrowFlying = false;
    elements.arrow.classList.remove('shooting');
    elements.shootBtn.disabled = false;
    
    // Update score
    updateScore();
    
    // Create hit effect
    createHitEffect();
    
    // Move target immediately to new position
    moveTarget();
};

const createHitEffect = () => {
    const targetRect = elements.target.getBoundingClientRect();
    const gameAreaRect = elements.gameArea.getBoundingClientRect();
    
    const effect = document.createElement('div');
    effect.className = 'hit-effect';
    effect.style.left = `${targetRect.left - gameAreaRect.left + gameState.targetSize / 2}px`;
    effect.style.top = `${targetRect.top - gameAreaRect.top + gameState.targetSize / 2}px`;
    
    elements.gameArea.appendChild(effect);
    
    // Remove effect after animation
    setTimeout(() => {
        effect.remove();
    }, 600);
};

// ============================================
// EVENT HANDLING
// ============================================
const setupEventListeners = () => {
    // Shoot button click
    elements.shootBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        shootArrow();
    });
    
    // Spacebar to shoot
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !gameState.gameOver) {
            e.preventDefault();
            shootArrow();
        }
    });
    
    // Restart button
    elements.restartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        restartGame();
    });
    
    // Click on target (alternative shooting method)
    elements.target.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!gameState.isArrowFlying && !gameState.gameOver) {
            shootArrow();
        }
    });
    
    // Prevent shooting when clicking game area background
    elements.gameArea.addEventListener('click', (e) => {
        if (e.target === elements.gameArea && !gameState.isArrowFlying && !gameState.gameOver) {
            shootArrow();
        }
    });
    
    // Custom crosshair
    elements.gameArea.addEventListener('mouseenter', () => {
        elements.crosshair.classList.add('active');
    });
    
    elements.gameArea.addEventListener('mouseleave', () => {
        elements.crosshair.classList.remove('active');
    });
    
    elements.gameArea.addEventListener('mousemove', (e) => {
        const rect = elements.gameArea.getBoundingClientRect();
        elements.crosshair.style.left = `${e.clientX - rect.left}px`;
        elements.crosshair.style.top = `${e.clientY - rect.top}px`;
    });
};

// ============================================
// GAME FLOW CONTROL
// ============================================
const startGame = () => {
    // Reset game state
    gameState.score = 0;
    gameState.timeLeft = 60;
    gameState.gameOver = false;
    gameState.isArrowFlying = false;
    gameState.difficulty = 1;
    gameState.targetSpeed = 2000;
    gameState.targetSize = 100;
    
    // Reset displays
    elements.scoreDisplay.textContent = '0';
    elements.timerDisplay.textContent = '60';
    elements.timerDisplay.style.color = '#00d9ff';
    elements.timerDisplay.style.animation = '';
    elements.difficultyDisplay.textContent = 'Level 1';
    
    // Reset target size
    elements.target.style.width = '100px';
    elements.target.style.height = '100px';
    
    // Hide game over screen
    elements.gameOverScreen.classList.remove('active');
    
    // Show shoot button, hide restart
    elements.shootBtn.style.display = 'block';
    elements.restartBtn.style.display = 'none';
    
    // Start game mechanics
    startTimer();
    startTargetMovement();
};

const endGame = () => {
    gameState.gameOver = true;
    
    // Stop all game mechanics
    stopTimer();
    stopTargetMovement();
    
    // Update final score
    elements.finalScoreDisplay.textContent = gameState.score;
    
    // Show game over screen
    elements.gameOverScreen.classList.add('active');
    
    // Hide shoot button, show restart
    elements.shootBtn.style.display = 'none';
    elements.restartBtn.style.display = 'block';
};

const restartGame = () => {
    startGame();
};

// ============================================
// GAME INITIALIZATION
// ============================================
const initializeGame = () => {
    setupEventListeners();
    startGame();
};

// Start the game when page loads
window.addEventListener('load', initializeGame);