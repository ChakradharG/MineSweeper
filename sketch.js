let boxes = [],
  rows = 10,
  cols = 10,
  width = 400,
  height = 400,
  bombDensity = 0.2;

function createBoxes() {
  for (let y = 0; y < rows; y++) {
    boxes[y] = [];
    for (let x = 0; x < cols; x++) {
      boxes[y][x] = {
        revealed: false,
        bomb: random(1) < bombDensity,
        neighCnt: 0
      };
    }
  }
}

function countNeighbours(y, x) {
  if (boxes[y][x].bomb) {
    boxes[y][x].neighCnt = '💣';
  } else {
    for (let i = max(0, y - 1); i < min(rows, y + 2); i++) {
      for (let j = max(0, x - 1); j < min(cols, x + 2); j++) {
        if (boxes[i][j].bomb) {
          boxes[y][x].neighCnt++;
        }
      }
    }
  }
}

function dispTile(y, x) {
  if (boxes[y][x].revealed) {
    stroke(125);
    fill(255);
    rect(x * width / cols, y * height / rows, width / cols, height / rows);
    noStroke();
    fill(0);
    text(boxes[y][x].neighCnt, (x + 0.5) * width / cols, (y + 0.5) * height / rows);
  } else {
    stroke(125);
    fill(55);
    rect(x * width / cols, y * height / rows, width / cols, height / rows);
  }
}

function reveal() {
  y = parseInt(mouseY / 40);
  x = parseInt(mouseX / 40);
  boxes[y][x].revealed = true;
  dispTile(y, x);
}

function setup() {
  cnv = createCanvas(width, height);
  cnv.mousePressed(reveal);
  textAlign(CENTER);
  createBoxes();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      countNeighbours(y, x);
      dispTile(y, x);
    }
  }
}

function draw() {
  // for (let y = 0; y < rows; y++) {
  //   for (let x = 0; x < cols; x++) {
  //     dispTile(y, x);
  //   }
  // }
}