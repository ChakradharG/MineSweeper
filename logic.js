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

function reveal(y, x) {
  if (tiles[y][x].revealed) {
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
    endScreen(false);
  } else if (--safeTiles === 0) {
    //If all the non-bomb tiles have been revealed, end the game
    gameOver = true;
    endScreen(true);
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
