let total = 0;
function MIN(table, currMax = -1e9) {
  total += 1;
  let min = 1e9;
  let move = -1;
  let verdict = check(table);
  if (verdict != 2) {
    return [verdict, move];
  }
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      if (table[j][i] == "") {
        table[j][i] = "O";
        let possible = MAX(table, min)[0];
        table[j][i] = "";
        if (currMax >= possible) {
          return [possible, i * 3 + j];
        }
        if (possible < min) {
          min = possible;
          move = i * 3 + j;
        }
      }
    }
  }
  return [min, move];
}
function MAX(table, currMin = 1e9) {
  total += 1;

  let max = -1e9;
  let move = -1;
  let verdict = check(table);
  if (verdict != 2) {
    return [verdict, move];
  }
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      if (table[j][i] == "") {
        table[j][i] = "X";
        let possible = MIN(table, max)[0];
        table[j][i] = "";

        if (currMin <= possible) {
          return [possible, i * 3 + j];
        }
        if (possible > max) {
          max = possible;
          move = i * 3 + j;
        }
      }
    }
  }
  return [max, move];
}
//1 win X
//0 draw
//-1 win O
//2 not end
function check(table) {
  let score = 0;
  for (let i = 0; i < table.length; i++) {
    let row = table[i];
    let col = table.map((row) => row[i]);
    if (
      row.every((item) => item === "X") ||
      col.every((item) => item === "X")
    ) {
      score = 1;
    } else if (
      row.every((item) => item === "O") ||
      col.every((item) => item === "O")
    ) {
      score = -1;
    }
  }
  let diag1 = [table[0][0], table[1][1], table[2][2]];
  let diag2 = [table[0][2], table[1][1], table[2][0]];
  if (
    diag1.every((item) => item === "X") ||
    diag2.every((item) => item === "X")
  ) {
    score = 1;
  } else if (
    diag1.every((item) => item === "O") ||
    diag2.every((item) => item === "O")
  ) {
    score = -1;
  }

  if (score === 0) {
    if (isBoardFull(table)) {
      return 0;
    } else {
      return 2;
    }
  }

  return score;
}

function isBoardFull(table) {
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      if (table[i][j] === "") {
        return false;
      }
    }
  }
  return true;
}
