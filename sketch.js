let tiles = [],
  mf = 1, //multiplying factor (value between 1 and 2)
  bombDensity = 0.2,
  rows = 8 * mf,
  cols = 8 * mf,
  height = 400 * mf,
  width = 400 * mf,
  tHeight = height / rows,
  tWidth = width / cols,
  safeTiles = rows * cols,
  gameOver = false;

function setup() {
  cnv = createCanvas(width, height + 50);
  cnv.mousePressed(pixToTile);
  textAlign(CENTER);
  textSize(22);
  strokeWeight(2);
  document.oncontextmenu = function() {
    return false; //To disable the browser context menu
  }
  createTiles();
  configTiles();
}

function draw() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      dispTile(y, x);
    }
  }
  if (gameOver) {
    noLoop();
  } else {
    highlight();
  }
}
