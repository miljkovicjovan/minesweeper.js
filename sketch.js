let cols = 10;
let rows = 10;
let tileSize;
let grid = [];

function setup() {
  createCanvas(400, 400);
  tileSize = width / cols;

  // Initialize the grid with default colors
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = {
        revealed: false,
        mine: false,
        count: 0,
      };
      // Randomly place mines (adjust the probability as needed)
      if (random() < 0.1) {
        grid[i][j].mine = true;
      }
    }
  }

  // Calculate adjacent mine counts
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (!grid[i][j].mine) {
        grid[i][j].count = countMines(i, j);
      }
    }
  }
}

function draw() {
  background(255);
  drawGrid();
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * tileSize;
      let y = j * tileSize;

      if (grid[i][j].revealed) {
        fill(200);
        stroke(0);
        rect(x, y, tileSize, tileSize);
        if (grid[i][j].mine) {
          fill(255, 0, 0);
          ellipse(x + tileSize / 2, y + tileSize / 2, tileSize * 0.8);
        } else {
          fill(0);
          textAlign(CENTER, CENTER);
          textSize(16);
          text(grid[i][j].count, x + tileSize / 2, y + tileSize / 2);
        }
      } else {
        fill(150);
        stroke(0);
        rect(x, y, tileSize, tileSize);
      }
    }
  }
}

function mousePressed() {
  // Check which tile is clicked
  let col = floor(mouseX / tileSize);
  let row = floor(mouseY / tileSize);

  // Reveal the clicked tile
  grid[col][row].revealed = true;

  // If the revealed tile is a mine, reveal all mines
  if (grid[col][row].mine) {
    revealAllMines();
    console.log("Game Over!");
  }
}

function countMines(x, y) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let col = x + i;
      let row = y + j;
      if (col >= 0 && col < cols && row >= 0 && row < rows) {
        if (grid[col][row].mine) {
          count++;
        }
      }
    }
  }
  return count;
}

function revealAllMines() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].mine) {
        grid[i][j].revealed = true;
      }
    }
  }
}
