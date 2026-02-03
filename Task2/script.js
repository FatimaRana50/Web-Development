let intervalId = null;

function startGame() {
  if (intervalId) return; 

  const inner = document.querySelector(".inner-div");
  const ball = document.querySelector(".ball");

  intervalId = setInterval(() => {
    const maxX = inner.clientWidth - ball.clientWidth;
    const maxY = inner.clientHeight - ball.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    ball.style.left = randomX + "px";
    ball.style.top = randomY + "px";
  }, 500); 
}
