let tiles = [],
  rows = 10,
  cols = 10,
  width = 800,
  height = 800,
  bombDensity = 0.2,
  safeTiles = rows * cols,
  gameOver = false;

function setup() {
  cnv = createCanvas(width, height + 50);
  cnv.mousePressed(pixToTile);
  textAlign(CENTER);
  document.oncontextmenu = function() {
    return false; //To disable the browser context menu
  }
  createTiles();
  configTiles();
}
