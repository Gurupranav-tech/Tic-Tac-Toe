const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const player = "X";
const ai = "O";
const rows = 3,
  cols = 3;
const lookup = {
  X: 1,
  Tie: 0,
  O: -1,
};
let gap;
let currentPlayer;

function setup() {
  createCanvas(400, 400);
  gap = width / cols;
  if (random(1) > 0.5) {
    currentPlayer = player;
  } else {
    currentPlayer = ai;
  }
}

function draw() {
  background(255);
  drawGrid();
  renderBoard();
  const winner = lineWin(board);
  if (winner !== undefined) {
    if (winner !== "Tie") createP(`<h1>${winner} won the match</h1>`);
    else createP("<h1>The match is a tie</h1>");
    noLoop();
  }
  if (currentPlayer === ai) {
    predict();
    currentPlayer = player;
  }
}

function lineWin(board) {
  let winner = undefined;
  for (let i = 0; i < rows; i++) {
    if (equals(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
      line(0, i * gap + gap / 2, width, i * gap + gap / 2);
    }
  }
  for (let i = 0; i < rows; i++) {
    if (equals(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
      line(i * gap + gap / 2, 0, i * gap + gap / 2, height);
    }
  }

  if (equals(board[0][0], board[1][1], board[2][2])) {
    winner = board[1][1];
    line(0, 0, width, height);
  }
  if (equals(board[0][2], board[1][1], board[2][0])) {
    winner = board[1][1];
    line(width, 0, 0, height);
  }

  let check = true;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!board[i][j]) {
        check = false;
      }
    }
  }

  if (check === true && winner === undefined) {
    return "Tie";
  } else {
    return winner;
  }
}

function didWin(board) {
  let winner = undefined;
  for (let i = 0; i < rows; i++) {
    if (equals(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }
  for (let i = 0; i < rows; i++) {
    if (equals(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  if (equals(board[0][0], board[1][1], board[2][2])) {
    winner = board[1][1];
  }
  if (equals(board[0][2], board[1][1], board[2][0])) {
    winner = board[1][1];
  }

  let check = true;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!board[i][j]) {
        check = false;
      }
    }
  }

  if (check === true && winner === undefined) {
    return "Tie";
  } else {
    return winner;
  }
}

function mousePressed() {
  const xIndex = floor(mouseX / gap);
  const yIndex = floor(mouseY / gap);
  if (xIndex > 2 || xIndex < 0 || yIndex > 2 || yIndex < 0) return;
  if (board[yIndex][xIndex]) {
    return;
  } else {
    board[yIndex][xIndex] = currentPlayer;
    if (currentPlayer == player) {
      currentPlayer = ai;
    }
  }
}

function equals(a, b, c) {
  return a === b && b === c && a === c && a !== "" && b !== "" && c !== "";
}

function drawGrid() {
  stroke(0);
  strokeWeight(3);
  for (let i = 1; i < rows; i++) {
    line(i * gap, 0, i * gap, height);
    line(0, i * gap, width, i * gap);
  }
}

function renderBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const pos = board[j][i];
      textSize(100);
      textAlign(CENTER, CENTER);
      text(pos, i * gap + gap / 2, j * gap + gap / 2);
    }
  }
}
