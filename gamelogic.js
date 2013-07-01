$( document ).ready(function() {
            
        

$(function () {


function tile()
{
	this.hasMine = false;
	this.isClicked = false;
}


function createBoard(size) {
  var arr = [];

  for (var x=0;x<size;x++)
	{
		arr[x] = [];
		for (var y=0;y<size;y++)
		{
			arr[x][y] = new tile()
		}
	}
  return arr;
}

function populateMines(gameBoard)
{

}

var gameBoard = createBoard(8)


$('.grid tr td').each(function(i) {
                $(this).html("X");
            });

$('td').click(function(){
  var col = $(this).parent().children().index($(this));
  var row = $(this).parent().parent().children().index($(this).parent());
  alert('Row: ' + row + ', Column: ' + col);
});



});

});