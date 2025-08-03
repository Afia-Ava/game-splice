console.log('Game.js loaded');
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded, starting game...');

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  console.log('Canvas:', canvas);
  console.log('Context:', ctx);
  console.log('Canvas size:', canvas.width, 'x', canvas.height);

  const player = {
    x: 100,
    y: 300,
    width: 40,
    height: 40,
    velocityY: 0,
    gravity: 0.7,
    jumpCount: 0,
    maxJumps: 5,
    onGround: false,
  };

  const foods = [];
  let score = 0;
  let gameTime = 0;
  let foodTimer = 0;

  const foodTypes = [
    { name: 'Fern', color: '#22c55e', emoji: '🌿', points: 10 },
    { name: 'Fish', color: '#3b82f6', emoji: '🐟', points: 15 },
    { name: 'Insect', color: '#f59e0b', emoji: '🦗', points: 5 },
    { name: 'Meat', color: '#dc2626', emoji: '🥩', points: 20 },
    { name: 'Egg', color: '#fbbf24', emoji: '🥚', points: 25 },
  ];

  function init() {
    console.log('Initializing game...');
    player.x = 100;
    player.y = canvas.height - player.height - 50; // Position above ground
    console.log('Player initialized at:', player.x, player.y);
    console.log(
      'Canvas height:',
      canvas.height,
      'Ground level:',
      canvas.height - 50
    );
    gameLoop();
  }

  function spawnFood() {
    const foodType = foodTypes[Math.floor(Math.random() * foodTypes.length)];
    const size = 25 + Math.random() * 15;
    const y = Math.random() * (canvas.height * 0.5) + canvas.height * 0.2;

    foods.push({
      x: canvas.width,
      y: y,
      width: size,
      height: size,
      type: foodType,
      speed: 3 + Math.random() * 2,
    });
  }

  function update() {
    gameTime++;

    player.velocityY += player.gravity;
    player.y += player.velocityY;

    if (player.y + player.height > canvas.height - 50) {
      player.y = canvas.height - 50 - player.height;
      player.velocityY = 0;
      player.jumpCount = 0;
      player.onGround = true;
    } else {
      player.onGround = false;
    }

    if (player.y < 0) {
      player.y = 0;
      player.velocityY = 0;
    }

    foodTimer++;
    if (foodTimer > 60) {
      spawnFood();
      foodTimer = 0;
    }

    for (let i = foods.length - 1; i >= 0; i--) {
      foods[i].x -= foods[i].speed;
      if (
        player.x < foods[i].x + foods[i].width &&
        player.x + player.width > foods[i].x &&
        player.y < foods[i].y + foods[i].height &&
        player.y + player.height > foods[i].y
      ) {
        score += foods[i].type.points;
        foods.splice(i, 1);
        continue;
      }

      if (foods[i].x + foods[i].width < 0) {
        foods.splice(i, 1);
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, 100, 100);
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(canvas.width - 100, 0, 100, 100);
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(0, canvas.height - 100, 100, 100);
    ctx.fillStyle = '#FF00FF';
    ctx.fillRect(canvas.width - 100, canvas.height - 100, 100, 100);
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(50, 50, 100, 100);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(200, 200, 100, 100);
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(400, 300, 80, 80);
    for (const food of foods) {
      ctx.fillStyle = food.type.color;
      ctx.fillRect(food.x, food.y, food.width, food.height);
    }

    ctx.fillStyle = '#000';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 20, 40);
    ctx.fillText(`Time: ${Math.floor(gameTime / 60)}s`, 20, 70);
    ctx.font = '16px Arial';
    ctx.fillText(
      'Press SPACE to jump (5x multi-jump!)',
      20,
      canvas.height - 10
    );
  }

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  document.addEventListener('keydown', e => {
    console.log('Key pressed:', e.code);
    if (e.code === 'Space' && player.jumpCount < player.maxJumps) {
      player.velocityY = -14;
      player.jumpCount++;
      console.log('Jump! Count:', player.jumpCount);
    }
  });
  console.log('Starting game...');
  init();
});
