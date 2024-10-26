let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let score = 0;

function setup() {
  createCanvas(600, 625);
  createButton("Reset").mousePressed(() => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    score = 0;
  });
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(5);

  line(200, 25, 200, 575);
  line(400, 25, 400, 575);
  line(25, 200, 575, 200);
  line(25, 400, 575, 400);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = i * 200 + 100;
      let y = j * 200 + 100;
      let squareValue = board[j][i];
      if (squareValue === "X") {
        drawCross(x, y);
      } else if (squareValue === "O") {
        drawCircle(x, y);
      }
    }
  }

  textSize(20);
  if (score === 1) {
    fill(0, 255, 0); // Green
    stroke(0);
    text("You Win", 270, 600);
  } else if (score === 0) {
    fill(255); // White
    stroke(0);

    text("Draw", 270, 600);
  } else if (score === -1) {
    fill(255, 0, 0); // Red
    stroke(0);

    text("You Lose", 270, 600);
  }
}

function drawCross(x, y) {
  stroke(255, 100, 150); // Pink
  line(x - 50, y - 50, x + 50, y + 50);
  line(x + 50, y - 50, x - 50, y + 50);
}

function drawCircle(x, y) {
  fill(0);
  stroke(135, 206, 250); // Light Blue
  circle(x, y, 100);
}

function mouseClicked() {
  let j = Math.floor(mouseX / 200);
  let i = Math.floor(mouseY / 200);

  if (board[i][j] === "" && check(board) === 2) {
    board[i][j] = "X";
    let model = MIN(JSON.parse(JSON.stringify(board)));
    let move = model[1];
    score = model[0];
    board[move % 3][Math.floor(move / 3)] = "O";
    console.log(total + " states checked");
    total = 0;
  }
}
