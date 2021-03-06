$(document).ready(function () {
  $(".cell").click(function () {
	var outsideCell = $(this).data('id').slice(0,5);
    var pos = $(this).data('id').slice(5);
	
	TTT.currBoardStr = outsideCell;
	TTT.currBoardNum = eval(TTT.currBoardStr);
	
    if ( _(TTT.possibleBoards).contains(TTT.currBoardStr)) {
    	
		if (TTT.valid(pos)) {
	      $(this)
	        .removeClass("cell")
	        .addClass(TTT.player)
	        .html(TTT.player.toUpperCase());
		  $(this).removeClass(TTT.player + "-turn")	
	      TTT.move(pos);
	 	 }
    };
  });
  
  $(".cell").hover(
	  function() {
	  	$(this).addClass(TTT.player + "-turn")
  	  }, function() {
  	  	$(this).removeClass(TTT.player + "-turn")
  	  } 
  );
});