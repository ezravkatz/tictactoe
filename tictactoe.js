var origBoard;
const huPlayer = "O";
const aiPayer = "X";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 7],
  [0, 4, 8],
  [2, 4, 6],
];

const cells = document.querySelectorAll(".cell");
startGame();

function startGame() {
  //set the replay button display back to one
  document.querySelector(".endgame").style.display = "none";
  origBoard = Array.from(Array(9).keys());
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener("click", turnClick, false);
  }
}

function turnClick(square) {
  turn(square.target.id, huPlayer);
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  //define all the places on the board that have been played in already
  //e is the element we're going through, i is the index
  let plays = board.reduce(
    (a, e, i) =>
      //if e is equal to the player, add index to array
      //if e ia not equal to player, return as it was
      e === player ? a.concat(i) : a,
    []
  );
  let gameWon = null;
  //loop through every wincombo to see if game has been won
  for (let [index, win] of winCombos.entries()) {
    //go through every element in the win combo and check if player has played in those spots

    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == huPlayer ? "blue" : "red";
  }
  //make it so you can't click cells
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
}
