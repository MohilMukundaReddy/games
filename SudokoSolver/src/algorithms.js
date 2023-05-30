let n = 9; // Global variable

class SudokuSolver {
  generate(stateStore, start, board, columns, rows, subMatrix, numOfSol) {
    if (start === n * n) {
      numOfSol[0]++;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          board[i][j] = stateStore[i][j];
        }
      }
      return;
    }

    const i = Math.floor(start / n);
    const j = start % n;

    if (stateStore[i][j] === "") {
      for (let k = 1; k <= n; k++) {
        if (
          columns[i][k - 1] === 0 &&
          rows[j][k - 1] === 0 &&
          subMatrix[
            Math.floor(i / Math.sqrt(n)) * Math.sqrt(n) +
              Math.floor(j / Math.sqrt(n))
          ][k - 1] === 0
        ) {
          columns[i][k - 1] = 1;
          rows[j][k - 1] = 1;
          subMatrix[
            Math.floor(i / Math.sqrt(n)) * Math.sqrt(n) +
              Math.floor(j / Math.sqrt(n))
          ][k - 1] = 1;
          stateStore[i][j] = k;

          this.generate(
            stateStore,
            start + 1,
            board,
            columns,
            rows,
            subMatrix,
            numOfSol
          );

          columns[i][k - 1] = 0;
          rows[j][k - 1] = 0;
          subMatrix[
            Math.floor(i / Math.sqrt(n)) * Math.sqrt(n) +
              Math.floor(j / Math.sqrt(n))
          ][k - 1] = 0;
          stateStore[i][j] = "";
        }
      }
      return;
    } else {
      this.generate(stateStore, start + 1, board, columns, rows, subMatrix, numOfSol);
      return;
    }
  }

  solveSudoku(board) {
    n = board.length; // Assign the value of n

    const stateStore = Array.from({ length: n }, () => Array(n).fill(""));
    const columns = Array.from({ length: n }, () => Array(n).fill(0));
    const rows = Array.from({ length: n }, () => Array(n).fill(0));
    const subMatrix = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] !== "") {
          columns[i][board[i][j] - 1] = 1;
          rows[j][board[i][j] - 1] = 1;
          subMatrix[
            Math.floor(i / Math.sqrt(n)) * Math.sqrt(n) +
              Math.floor(j / Math.sqrt(n))
          ][board[i][j] - 1] = 1;
          stateStore[i][j] = board[i][j];
        }
      }
    }

    let start = 0;
    let numOfSol = [0];
    this.generate(stateStore, start, board, columns, rows, subMatrix, numOfSol);
    return [numOfSol, board];
  }
}

// Passed by reference:
// • Arrays
// • Obiects
// Passed by value:
// • Everything else

export default SudokuSolver;