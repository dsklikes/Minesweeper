$(document).ready(function() {


  $(function() {


    function tile() {
      this.hasMine = false;
      this.isClicked = false;
    }


    function newGame(size) {
      var board = [];
      var mineCount = 0;

      for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
          board[i][j] = new tile();
        }
      }
      board = populateMines(board, size);
      return board;
    }

    function populateMines(gameBoard, size) {

      var mineCount = 0;

      while (mineCount < 10) {
        var i = Math.floor((Math.random() * (size - 1)));
        var j = Math.floor((Math.random() * (size - 1)));
        if (!gameBoard[i][j].hasMine) {
          gameBoard[i][j].hasMine = true;
          $(".grid tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")").html("X");
          mineCount++;
        }
      }
      return gameBoard;
    }

    var gameBoard = newGame(8);

    function tileClicked(x, y) {
      gameBoard[x][y].isClicked = true;
      if (gameBoard[x][y].hasMine) {
        $(".grid tr:nth-child(" + (x + 1) + ") td:nth-child(" + (y + 1) + ")").html("O");
      } else {
        showNearbyMineCount(x, y);
      }

    }

    function showNearbyMineCount(x, y) {
      var mineCounter = 0;
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          if ((x + i >= 0) && (y + j >= 0) && (x + i <= 7) && (y + j <= 7)) {
            if (gameBoard[x + i][y + j].hasMine) {
              mineCounter++;

            }
          }
          }
        }
       $(".grid tr:nth-child(" + (x + 1) + ") td:nth-child(" + (y + 1) + ")").html(mineCounter);

  /*     if (mineCounter === 0)
        {

          for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
              if ((x + i >= 0) && (y + j >= 0) && (x + i <= 7) && (y + j <= 7)) {
                 showNearbyMineCount(x+i,y+j)
              }
              }
            }         
        }
        else
        {
         $(".grid tr:nth-child(" + (x + 1) + ") td:nth-child(" + (y + 1) + ")").html(mineCounter);

        }*/

      }





    $('td').click(function() {
      var col = $(this).parent().children().index($(this));
      var row = $(this).parent().parent().children().index($(this).parent());
      tileClicked(row, col);
    });


  });

});