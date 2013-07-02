$(function() {
  var gameActive = true;
  var godModeOn = false;
  // each tile has two variables

  function tile() {
    this.hasMine = false;
    this.isClicked = false;
  }

  // create new blank board

  function newGame(size, numMines) {
    // empty board
    var board = [];
    for (var i = 0; i < size; i++) {
      board[i] = [];
      for (var j = 0; j < size; j++) {
        // each coordinate is made of "tiles"
        board[i][j] = new tile();
      }
    }
    // call populateMines
    board = populateMines(board, size, numMines);

    return board;
  }

  // add mines to board 

  function populateMines(gameBoard, size, numMines) {
    var mineCount = 0;

    while (mineCount < numMines) {
      // randomly selects a tile in array
      var i = Math.floor((Math.random() * (size - 1)));
      var j = Math.floor((Math.random() * (size - 1)));
      if (!gameBoard[i][j].hasMine) {
        // places mines
        gameBoard[i][j].hasMine = true;
        mineCount++;
      }
    }
    return gameBoard;
  }

  // create new gameboard 8x8 and 10 mines
  var size = 8;
  var mines = 10;
  var gameBoard = newGame(size, mines);

  // if you click on a tile

  function tileClicked(x, y) {
    gameBoard[x][y].isClicked = true;
    // change background to red
    $(".grid tr:nth-child(" + (x + 1) + ") td:nth-child(" + (y + 1) + ")").css('background-color', 'red');
    // explode if there is a mine/end game
    if (gameBoard[x][y].hasMine) {
      $(".grid tr:nth-child(" + (x + 1) + ") td:nth-child(" + (y + 1) + ")").html("O");
      endGame();
    } else {
      // show how many mines
      showNearbyMineCount(x, y);
    }
  }

  // count mines around it

  function showNearbyMineCount(x, y) {
    var mineCounter = 0;
    // loop through all sides
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        // if within boundaries & there is a mine
        if ((isWithinBounds(x + i, y + j)) && (gameBoard[x + i][y + j].hasMine)) {
          mineCounter++;
        }
      }
    }

    // if there are no mines around it
    if (mineCounter === 0) {
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          // click all tiles that are within boundaries & not clicked yet
          if ((isWithinBounds(x + i, y + j)) && (!gameBoard[x + i][y + j].isClicked)) {
            tileClicked(x + i, y + j);
          }
        }
      }
    } else {
      // display # of mines
      $(".grid tr:nth-child(" + (x + 1) + ") td:nth-child(" + (y + 1) + ")").html(mineCounter);
    }
  }


  // checks if a coordinate is within the boundaries of the game

  function isWithinBounds(x, y) {
    if ((x >= 0) && (y >= 0) && (x <= (size - 1)) && (y <= (size - 1))) {
      return true;
    } else {
      return false;
    }

  }

  // shows all Mines on board
  function showAllMines() {
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        if (gameBoard[i][j].hasMine) {
          $(".grid tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")").html("X");
          $(".grid tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")").css("background-color", "yellow");
        }
      }
    }
  }

  // hides all Mines on board
  function hideAllMines() {
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        if (gameBoard[i][j].hasMine) {
          $(".grid tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")").html("");
          $(".grid tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")").css("background-color", "#C8C8C8");
        }
      }
    }
  }

  // ends game
  function endGame() {
    showAllMines();
    gameActive = false;
    $('td').removeClass('active');
  }

  function checkGame() {
    var counter = 0;
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        if ((gameBoard[i][j].hasMine) || (!gameBoard[i][j].isClicked)) 
            {
              counter++;
            }        
      }
    }
    return (counter===10)? true : false;
  }

//alerts
function validationAlert(){
  if (checkGame()){
        alert('Congratulations! You won!');
        endGame();
     }
     else
     {
        alert('Please Keep Playing');
     }
}

  // on cilck of table cell
  $('td').click(function() {
    if (gameActive) {
      var col = $(this).parent().children().index($(this));
      var row = $(this).parent().parent().children().index($(this).parent());
      tileClicked(row, col);
      // auto validation
      if (checkGame()){validationAlert()};
    } else {
      alert('Please Start a New Game')
    }
  });

  // new game button
  $('li.newGame').click(function() {
      gameBoard = newGame(size, mines);
      gameActive = true;
      $('td').css('background-color','#C8C8C8');
      $('td').removeClass('active').addClass('active');
      $('td').html('');
  });

  // god mode button
  $('li.godMode').click(function() {
      if (godModeOn)
      {
        hideAllMines();
        godModeOn = false;
        $(this).removeClass('on');
      }
      else {
        showAllMines();
        godModeOn = true;
        $(this).addClass('on');
      }
    });

  //validate button (now done automatically unnecessary)
  $('li.validate').click(function() {
    validationAlert();
  });
});