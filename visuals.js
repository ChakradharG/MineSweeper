function pixToTile() {
  //Converts the coordinates of the cursor into the index of the tile clicked
  if (mouseY > height || gameOver) {
    return;
  }
  y = parseInt(mouseY / (height / rows));
  x = parseInt(mouseX / (width / cols));
  if (mouseButton === LEFT) {
    reveal(y, x);
  } else if (mouseButton === RIGHT) {
    tiles[y][x].flag = !tiles[y][x].flag;
    dispTile(y, x);
  }
}

function dispTile(y, x) {
  //Renders the tiles onto the screen, depending upon their state
  if (tiles[y][x].revealed) {
    stroke(125);
    (tiles[y][x].flag && tiles[y][x].bomb) ? fill(94, 242, 19): fill(255);
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
      triangle(x * width / cols + 10, y * height / rows + 15,
        (x + 1) * width / cols - 10, y * height / rows + 15,
        (x + 0.5) * width / cols, (y + 1) * height / rows - 10);
    }
  }
}

function endScreen(res) {
  textSize(30);
  fill(255);
  if (res) {
    text('Victory!', width / 2, height + 50);
  } else {
    text('Defeat!', width / 2, height + 50);
  }
}
