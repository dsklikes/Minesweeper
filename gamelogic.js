$( document ).ready(function() {
            
        

$(function () {

var tile = new Array();


var createBoard = function (size){
	var rowsize = size;
	var colsize = size;
	for (var x=0;i<rowsize;x++)
	{
		for (var y=0;i<colsize;y++)
		{
			tile[x][y].hasMine = false;
			tile[x][y].isClicked = false;
		}
	}
}

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