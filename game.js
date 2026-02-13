// =============================
// CONFIGURAÇÕES
// =============================
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;
const GAME_SPEED = 100;

let intervalId;

const gameState = {
  snake: [],
  direction: "RIGHT",
  food: {},
  score: 0,
  running: false,
  started: false,
  gameOver: false
};

// =============================
// INICIALIZAÇÃO
// =============================
function init() {
  resetGame();
  document.addEventListener("keydown", handleKeyPress);
  intervalId = setInterval(gameLoop, GAME_SPEED);

  // Botão Play
  document.getElementById("play-btn").addEventListener("click", () => {
    if (!gameState.started) {
      gameState.started = true;
      gameState.running = true;
      messageEl.textContent = "";
      document.querySelector('.buttons').style.display = 'none';
    } else if (!gameState.running) {
      gameState.running = true;
      messageEl.textContent = "";
    }
  });

  // Botão Controles
  document.getElementById("controls-btn").addEventListener("click", () => {
    const controlsDiv = document.getElementById("controls-div");
    controlsDiv.style.display = "block";
    document.querySelector('.buttons').style.display = 'none';
  });

  // Botão Créditos
  document.getElementById("credits-btn").addEventListener("click", () => {
    const creditsDiv = document.getElementById("credits-div");
    creditsDiv.style.display = "block";
    document.querySelector('.buttons').style.display = 'none';
  });

  // Botão Voltar Controles
  document.getElementById("back-controls-btn").addEventListener("click", () => {
    const controlsDiv = document.getElementById("controls-div");
    controlsDiv.style.display = "none";
    document.querySelector('.buttons').style.display = 'flex';
  });

  // Botão Voltar Créditos
  document.getElementById("back-credits-btn").addEventListener("click", () => {
    const creditsDiv = document.getElementById("credits-div");
    creditsDiv.style.display = "none";
    document.querySelector('.buttons').style.display = 'flex';
  });

  // Botão Jogar outra
  document.getElementById("play-again-btn").addEventListener("click", () => {
    resetGame();
    gameState.started = true;
    gameState.running = true;
    document.getElementById("game-over-buttons").style.display = "none";
    messageEl.textContent = "";
  });

  // Botão Inicio
  document.getElementById("home-btn").addEventListener("click", () => {
    resetGame();
    document.getElementById("game-over-buttons").style.display = "none";
  });
}

function resetGame() {
  gameState.snake = [{ x: 200, y: 200 }];
  gameState.direction = "RIGHT";
  gameState.food = generateFood();
  gameState.score = 0;
  gameState.running = false; // começa pausado
  gameState.started = false;
  gameState.gameOver = false;
  scoreEl.textContent = 0;
  messageEl.textContent = "";
  clearCanvas(); // Limpa o canvas para remover qualquer frame anterior
}

// =============================
// LOOP PRINCIPAL
// =============================
function gameLoop() {
  if (!gameState.running) return;
  update();
  draw();
}

// =============================
// ATUALIZAÇÃO DO JOGO
// =============================
function update() {
  const head = { ...gameState.snake[0] };

  moveHead(head);
  applyWrapAround(head);

  if (checkSelfCollision(head)) {
    endGame();
    return;
  }

  gameState.snake.unshift(head);

  if (isEating(head)) {
    gameState.score++;
    scoreEl.textContent = gameState.score;
    gameState.food = generateFood();
  } else {
    gameState.snake.pop();
  }
}

function moveHead(head) {
  switch (gameState.direction) {
    case "UP": head.y -= GRID_SIZE; break;
    case "DOWN": head.y += GRID_SIZE; break;
    case "LEFT": head.x -= GRID_SIZE; break;
    case "RIGHT": head.x += GRID_SIZE; break;
  }
}

function applyWrapAround(head) {
  if (head.x < 0) head.x = CANVAS_SIZE - GRID_SIZE;
  if (head.x >= CANVAS_SIZE) head.x = 0;
  if (head.y < 0) head.y = CANVAS_SIZE - GRID_SIZE;
  if (head.y >= CANVAS_SIZE) head.y = 0;
}

function checkSelfCollision(head) {
  return gameState.snake.some(segment =>
    segment.x === head.x && segment.y === head.y
  );
}

function isEating(head) {
  return head.x === gameState.food.x &&
         head.y === gameState.food.y;
}

// =============================
// DESENHO
// =============================
function draw() {
  clearCanvas();
  drawFood();
  drawSnake();
  if (gameState.gameOver) {
    drawGameOver();
  }
}

function clearCanvas() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function drawSnake() {
  ctx.fillStyle = "#00ff00";
  gameState.snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);
  });
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(gameState.food.x, gameState.food.y, GRID_SIZE, GRID_SIZE);
}

function drawGameOver() {
  // Desenhar overlay semi-transparente
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // Desenhar texto
  ctx.fillStyle = "#0f0";
  ctx.font = "16px Kavoon";
  ctx.textAlign = "center";
  ctx.fillText(`💀 Game Over! Pontuação: ${gameState.score}`, CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 40);
}

// =============================
// UTILITÁRIOS
// =============================
function generateFood() {
  return {
    x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)) * GRID_SIZE,
    y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)) * GRID_SIZE
  };
}

function handleKeyPress(event) {
  const keyMap = {
    ArrowUp: "UP",
    ArrowDown: "DOWN",
    ArrowLeft: "LEFT",
    ArrowRight: "RIGHT",
    w: "UP",
    W: "UP",
    s: "DOWN",
    S: "DOWN",
    a: "LEFT",
    A: "LEFT",
    d: "RIGHT",
    D: "RIGHT"
  };

  const newDirection = keyMap[event.key];

  // Inicia o jogo na primeira tecla pressionada (mas agora só com botão Play)
  // Removido para forçar uso do botão Play

  // Pausar/Continuar
  if (event.key === "p" || event.key === "P") {
    gameState.running = !gameState.running;
    messageEl.textContent = gameState.running ? "" : "⏸ Pausado | Pressione P para continuar";
    return;
  }

  // Reiniciar o jogo
  if (event.key === "r" || event.key === "R") {
    resetGame();
    gameState.running = true;
    messageEl.textContent = "";
    document.querySelector('.buttons').style.display = 'none';
    return;
  }

  // Voltar para tela inicial
  if (event.key === "Escape") {
    resetGame();
    document.getElementById("controls-div").style.display = "none";
    document.getElementById("credits-div").style.display = "none";
    return;
  }

  if (!newDirection) return;

  const oppositeDirections = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT"
  };

  if (oppositeDirections[gameState.direction] !== newDirection) {
    gameState.direction = newDirection;
  }
}

function endGame() {
  gameState.running = false;
  gameState.gameOver = true;
  document.getElementById("game-over-buttons").style.display = "flex";
}

// =============================
// START
// =============================
init();
