function initValues() {
  mf = sliderMF.value;
  bombDensity = sliderBD.value;
  rows = 8 * mf,
  cols = 8 * mf,
  height = 400 * mf,
  width = 400 * mf,
  tHeight = height / rows,
  tWidth = width / cols,
  safeTiles = rows * cols,
  gameOver = false;
}

function pixToTile() {
  //Converts the coordinates of the cursor into the index of the tile clicked
  if (mouseY >= height || gameOver) {
    return;
  }
  y = parseInt(mouseY / tHeight);
  x = parseInt(mouseX / tWidth);
  if (mouseButton === LEFT) {
    reveal(y, x);
  } else if (mouseButton === RIGHT) {
    tiles[y][x].flag = !tiles[y][x].flag;
  }
}

function dispTile(y, x) {
  //Renders the tiles onto the screen, depending upon their state
  stroke(100);
  if (tiles[y][x].revealed) {
    (tiles[y][x].flag && tiles[y][x].bomb) ? fill(100, 224, 89): fill(130);
    rect(x * tWidth, y * tHeight, tWidth, tHeight);
    noStroke();
    fill(0);
    text(tiles[y][x].neighCnt, (x + 0.5) * tWidth, (y + 0.65) * tHeight);
  } else {
    fill(50);
    rect(x * tWidth, y * tHeight, tWidth, tHeight);
    if (tiles[y][x].flag) {
      noStroke();
      fill(252, 245, 3);
      text('⚠', (x + 0.5) * tWidth, (y + 0.65) * tHeight);
    }
  }
}

function highlight() {
  //Highlights all the neighbours of the tile pointed by the cursor
  if (mouseY < 0 || mouseY >= height || mouseX < 0 || mouseX >= width) {
    return;
  }
  y = parseInt(mouseY / tHeight);
  x = parseInt(mouseX / tWidth);
  noFill();
  stroke(0, 200, 200);
  for (let i = max(0, y - 1); i < min(rows, y + 2); i++) {
    for (let j = max(0, x - 1); j < min(cols, x + 2); j++) {
      rect(j * tWidth, i * tHeight, tWidth, tHeight);
    }
  }
}

function endScreen(res) {
  //Displays the result of the game
  let ele1 = document.getElementById('endScreen1');
  ele1.style.color = '#C8C8C8';
  ele1.innerHTML = `${res ? 'Victory' : 'Defeat'}!`;
  let ele2 = document.getElementById('endScreen2');
  ele2.style.color = '#C8C8C8';
  ele2.innerHTML = 'Press R to play again';
}
