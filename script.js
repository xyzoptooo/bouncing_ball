document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const ballColorInput = document.getElementById('ballColor');
  const ballSpeedInput = document.getElementById('ballSpeed');

  // Load preferences from localStorage or set defaults
  let ballColor = localStorage.getItem('ballColor') || '#ff0000';
  let ballSpeed = parseInt(localStorage.getItem('ballSpeed')) || 5;

  ballColorInput.value = ballColor;
  ballSpeedInput.value = ballSpeed;

  // Ball properties
  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: ballSpeed,
    dy: ballSpeed,
    color: ballColor,
  };

  // Update ball speed and direction based on speed input
  function updateBallSpeed(speed) {
    const signX = ball.dx < 0 ? -1 : 1;
    const signY = ball.dy < 0 ? -1 : 1;
    ball.dx = speed * signX;
    ball.dy = speed * signY;
  }

  updateBallSpeed(ballSpeed);

  // Draw the ball
  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  }

  // Clear the canvas
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Update ball position and handle bouncing
  function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off left or right walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx;
    }

    // Bounce off top or bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.dy = -ball.dy;
    }
  }

  // Animation loop
  function animate() {
    clearCanvas();
    drawBall();
    update();
    requestAnimationFrame(animate);
  }

  // Event listeners for user preferences
  ballColorInput.addEventListener('input', (e) => {
    ball.color = e.target.value;
    localStorage.setItem('ballColor', ball.color);

    // Trigger pulse animation on color input
    ballColorInput.classList.add('animate-pulse');
    setTimeout(() => {
      ballColorInput.classList.remove('animate-pulse');
    }, 1000);

    // Trigger glow animation on game container
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.classList.add('animate-glow');
    setTimeout(() => {
      gameContainer.classList.remove('animate-glow');
    }, 1000);
  });

  ballSpeedInput.addEventListener('input', (e) => {
    const speed = parseInt(e.target.value);
    updateBallSpeed(speed);
    localStorage.setItem('ballSpeed', speed);

    // Trigger pulse animation on speed input
    ballSpeedInput.classList.add('animate-pulse');
    setTimeout(() => {
      ballSpeedInput.classList.remove('animate-pulse');
    }, 1000);

    // Trigger glow animation on game container
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.classList.add('animate-glow');
    setTimeout(() => {
      gameContainer.classList.remove('animate-glow');
    }, 1000);
  });

  // Start animation
  animate();
});
