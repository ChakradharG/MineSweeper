let tiles = [],
  rows = 5,
  cols = 5,
  safeTiles = rows * cols,
  width = 400,
  height = 400,
  bombDensity = 0.4,
  gameOver = false;

function createTiles() {
  //Creates a 2D array of Tile objects of size rows*cols 
  for (let y = 0; y < rows; y++) {
    tiles[y] = [];
    for (let x = 0; x < cols; x++) {
      tiles[y][x] = {
        revealed: false,
        bomb: random(1) < bombDensity,
        neighCnt: 0,
        flag: false
      };
    }
  }
}

function configTiles() {
  /*Counts the bombs in the neighbouring tiles
  for each tile, and displays the tiles on the screen*/
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (tiles[y][x].bomb) {
        tiles[y][x].neighCnt = '💣';
        safeTiles--;
      } else {
        for (let i = max(0, y - 1); i < min(rows, y + 2); i++) {
          for (let j = max(0, x - 1); j < min(cols, x + 2); j++) {
            if (tiles[i][j].bomb) {
              tiles[y][x].neighCnt++;
            }
          }
        }
        if (tiles[y][x].neighCnt === 0) {
          tiles[y][x].neighCnt = '';
        }
      }
      dispTile(y, x);
    }
  }
}

function dispTile(y, x) {
  //Renders the tiles onto the screen, depending upon their state
  if (tiles[y][x].revealed) {
    stroke(125);
    tiles[y][x].flag? fill(0,200,0) : fill(255);
    rect(x * width / cols, y * height / rows, width / cols, height / rows);
    noStroke();
    fill(0);
    text(tiles[y][x].neighCnt, (x + 0.5) * width / cols, (y + 0.6) * height / rows);
  } else {
    stroke(125);
    fill(55);
    rect(x * width / cols, y * height / rows, width / cols, height / rows);
    if (tiles[y][x].flag) {
      fill(255, 64, 64);
      noStroke();
      triangle(x * width / cols + 25, y * height / rows + 30,
              (x + 1) * width / cols - 25,y * height / rows + 30,
              (x + 0.5) * width / cols, (y + 1) * height / rows - 25);
    }
  }
}

function pixToTile() {
  //Converts the coordinates of the cursor into the index of the tile clicked
  y = parseInt(mouseY / (height / rows));
  x = parseInt(mouseX / (width / cols));
  if (mouseButton === LEFT) {
    reveal(y, x);
  } else if (mouseButton === RIGHT) {
    tiles[y][x].flag = !tiles[y][x].flag;
    dispTile(y, x);
  }
}

function reveal(y, x) {
  if (gameOver || tiles[y][x].revealed) {
    return;
  }
  tiles[y][x].revealed = true;
  dispTile(y, x);
  if (tiles[y][x].neighCnt === '💣') {
    //If a bomb is clicked on, reveal all bombs and end the game
    gameOver = true;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (tiles[i][j].neighCnt === '💣') {
          tiles[i][j].revealed = true;
          dispTile(i, j);
        }
      }
    }
    console.log('Lost');
  } else if (--safeTiles === 0) {
    //If all the non-bomb tiles have been revealed, end the game
    gameOver = true;
    console.log('Won');
  } else if (tiles[y][x].neighCnt === '') {
    //If the tile is empty, reveal all of its neighbours
    for (let i = max(0, y - 1); i < min(rows, y + 2); i++) {
      for (let j = max(0, x - 1); j < min(cols, x + 2); j++) {
        if ((i != y || j != x) && !tiles[i][j].revealed) {
          reveal(i, j);
        }
      }
    }
  }
}

function setup() {
  cnv = createCanvas(width, height);
  cnv.mousePressed(pixToTile);
  textAlign(CENTER);
  document.oncontextmenu = function() { return false; } //To disable the browser context menu
  createTiles();
  configTiles();
}
