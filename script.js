$(document).ready(function () {
  $(".cell").click(function () {
	var outsideCell = $(this).data('id').slice(0,5);
    var pos = $(this).data('id').slice(5);
	
	TTT.currBoardStr = outsideCell;
	TTT.currBoardNum = eval(TTT.currBoardStr);
	console.log(eval(pos));
	
    if ( _(TTT.possibleBoards).contains(TTT.currBoardStr)) {
    	
		if (TTT.valid(pos)) {
	      $(this)
	        .removeClass("cell")
	        .addClass(TTT.player)
	        .text(TTT.player.toUpperCase());
	      TTT.move(pos);
	 	 }
    };
  });
});