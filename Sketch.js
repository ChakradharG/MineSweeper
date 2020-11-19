let tiles = [],
  mf, //multiplying factor
  bombDensity,
  sliderMF = document.getElementById("sliderMF"),
  sliderBD = document.getElementById("sliderBD"),
  rows,
  cols,
  height,
  width,
  tHeight,
  tWidth,
  safeTiles,
  gameOver;

function setup() {
  initValues();
  cnv = createCanvas(width, height);
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

sliderMF.oninput = function() {
  if (!gameOver) {
    setup();
  }
}

sliderBD.oninput = function() {
  if (!gameOver) {
    setup();
  }
}

function keyPressed() {
  if (keyCode === 82) {
    let ele1 = document.getElementById('endScreen1');
    ele1.style.color = '#000000';
    ele1.innerHTML = '...';
    let ele2 = document.getElementById('endScreen2');
    ele2.style.color = '#000000';
    ele2.innerHTML = '...';
    setup();
  }
}

function draw() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      dispTile(y, x);
    }
  }
  if (!gameOver) {
    highlight();
  }
}
