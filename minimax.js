function predict() {
  let bestScore = Infinity;
  let bestMove;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === "") {
        board[i][j] = ai;
        const score = maximizer(board);
        board[i][j] = "";
        if (score < bestScore) {
          bestScore = score;
          bestMove = { i, j };
        }
      }
    }
  }
  board[bestMove.i][bestMove.j] = ai;
}

function maximizer(board) {
  const winner = didWin(board);
  if (winner !== undefined) {
    return lookup[winner];
  }

  let bestScore = -Infinity;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === "") {
        board[i][j] = player;
        const score = minimizer(board);
        board[i][j] = "";
        bestScore = max(score, bestScore);
      }
    }
  }
  return bestScore;
}

function minimizer(board) {
  const winner = didWin(board);
  if (winner !== undefined) {
    return lookup[winner];
  }

  let bestScore = Infinity;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === "") {
        board[i][j] = ai;
        const score = maximizer(board);
        board[i][j] = "";
        bestScore = min(score, bestScore);
      }
    }
  }
  return bestScore;
}
