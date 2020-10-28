let tiles = [],
  rows = 10,
  cols = 10,
  width = 400,
  height = 400,
  bombDensity = 0.2,
  gameOver = false;

function createTiles() {
  for (let y = 0; y < rows; y++) {
    tiles[y] = [];
    for (let x = 0; x < cols; x++) {
      tiles[y][x] = {
        revealed: false,
        bomb: random(1) < bombDensity,
        neighCnt: 0
      };
    }
  }
}

function countNeighbours() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (tiles[y][x].bomb) {
        tiles[y][x].neighCnt = '💣';
      } else {
        for (let i = max(0, y - 1); i < min(rows, y + 2); i++) {
          for (let j = max(0, x - 1); j < min(cols, x + 2); j++) {
            if (tiles[i][j].bomb) {
              tiles[y][x].neighCnt++;
            }
          }
        }
      }
      dispTile(y, x);
    }
  }
}

function dispTile(y, x) {
  if (tiles[y][x].revealed) {
    stroke(125);
    fill(255);
    rect(x * width / cols, y * height / rows, width / cols, height / rows);
    noStroke();
    fill(0);
    text(tiles[y][x].neighCnt, (x + 0.5) * width / cols, (y + 0.6) * height / rows);
  } else {
    stroke(125);
    fill(55);
    rect(x * width / cols, y * height / rows, width / cols, height / rows);
  }
}

function reveal() {
  if (gameOver) {
    return;
  }
  y = parseInt(mouseY / 40);
  x = parseInt(mouseX / 40);
  tiles[y][x].revealed = true;
  dispTile(y, x);
  if (tiles[y][x].neighCnt == '💣') {
    gameOver = true;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (tiles[i][j].neighCnt == '💣') {
          tiles[i][j].revealed = true;
          dispTile(i, j);
        }
      }
    }
  }
}

function setup() {
  cnv = createCanvas(width, height);
  cnv.mousePressed(reveal);
  textAlign(CENTER);
  createTiles();
  countNeighbours();
}

// function draw() {}