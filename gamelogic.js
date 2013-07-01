$( document ).ready(function() {
            
        

$(function () {

var tile = new Array();


var createBoard = function (size){
	var rowsize = size;
	var colsize = size;
	for (var x=0;x<rowsize;x++)
	{
		for (var y=0;y<colsize;y++)
		{
			tile[x][y] = 0;
			tile[x][y].hasMine = false;
			tile[x][y].isClicked = false;
		}
	}
}
createBoard(8);

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