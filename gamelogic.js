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

    function checkForMine(x, y) {
      gameBoard[x][y].isClicked = true;
      if (gameBoard[x][y].hasMine) {
        $(".grid tr:nth-child(" + (x+1) + ") td:nth-child(" + (y+1) + ")").html("O");
      } else {
        $(".grid tr:nth-child(" + (x+1) + ") td:nth-child(" + (y+1) + ")").html("-");
      }

    }

    // $('.grid tr td').each(function(i) {
    //               $(this).html("X");
    //           });


    $('td').click(function() {
      var col = $(this).parent().children().index($(this));
      var row = $(this).parent().parent().children().index($(this).parent());
      checkForMine(row, col);
    });


  });

});