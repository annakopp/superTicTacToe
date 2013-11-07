(function (root) {
  var TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function TT() {
    this.player = Game.marks[0];
    //this.board = this.makeBoard();
	this.bigBoard = this.makeBigBoard();			 
	this.possibleBoards = [ "[0,0]", "[0,1]", "[0,2]",
							"[1,0]", "[1,1]", "[1,2]",
							"[2,0]", "[2,1]", "[2,2]" ];
							
	this.boardsInPlay = [ "[0,0]", "[0,1]", "[0,2]",
							"[1,0]", "[1,1]", "[1,2]",
							"[2,0]", "[2,1]", "[2,2]" ];
	this.currBoardStr = "[0,0]";
	this.currBoardNum = eval(this.currBoardStr);
  }

  Game.marks = ["x", "o"];

  
  Game.prototype.diagonalWinner = function (board) {
    var game = this;
    var diagonalPositions1 = [[0, 0], [1, 1], [2, 2]];
    var diagonalPositions2 = [[2, 0], [1, 1], [0, 2]];

    var winner = null;
    _(Game.marks).each(function (mark) {
      function didWinDiagonal (diagonalPositions) {
        return _.every(diagonalPositions, function (pos) {
          return board[pos[0]][pos[1]] === mark;
        });
      }
	  
      var won = _.any(
        [diagonalPositions1, diagonalPositions2],
        didWinDiagonal
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.horizontalWinner = function (board) {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (i) {
        return _(indices).every(function (j) {
          return board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.makeBigBoard = function() {
	  var that = this;
      return _.times(3, function (i) {
        return _.times(3, function (j) {
          return that.makeBoard();
        });
      });
  };

  Game.prototype.makeBoard = function () {
    return _.times(3, function (i) {
      return _.times(3, function (j) {
        return null;
      });
    });
  };

  Game.prototype.tie = function(board) {
	  var emptyCount = 0
	  if (this.winner(board)) return false
	  _(board).each(function(row) {
		  _(row).each(function(cell){
			  if (cell === null) emptyCount += 1
		  })
	  })
	  if (emptyCount === 0) {
		  return true;
	  }
	  return false;
  };

  Game.prototype.move = function (strCoords) {
    var pos = eval(strCoords);
	
	var $outsideCell = $('[data-id="'+ this.currBoardStr + '"]');
	
    this.placeMark(pos);
	
	//if small board is tied, remove from play
	if (this.tie(this.bigBoard[this.currBoardNum[0]][this.currBoardNum[1]])) {
		this.boardsInPlay.splice(this.boardsInPlay.indexOf(this.currBoardStr),1);
	};
	
	//if a small board is won:
    if (this.winner(this.bigBoard[this.currBoardNum[0]][this.currBoardNum[1]])) {
		$outsideCell.empty();
	 	$outsideCell.html(this.player);
	  	$outsideCell.addClass("giant-" + this.player);
	  
	  	this.bigBoard[this.currBoardNum[0]][this.currBoardNum[1]] = this.player;
	  
	 	if (this.winner(this.bigBoard)) {
			//if there is a winner of the whole game
		  	alert(this.player + " wins!")
		  	location.reload();
	  	}
  
		//remove winning board from list of possible boards
		this.boardsInPlay.splice(this.boardsInPlay.indexOf(this.currBoardStr),1);
    }
	
	this.switchPlayer();
	this.currBoardStr = strCoords;
	this.currBoardNum = eval(this.currBoardStr);
  
	this.possibleBoards = _(this.boardsInPlay).contains(this.currBoardStr) ? [this.currBoardStr] : this.boardsInPlay;

	_($(".current")).each(function(board){
		$(board).removeClass("current");
	})
	_(this.possibleBoards).each(function(board){
		$('[data-id="'+ board + '"]').addClass("current");
	})
	
    return true;
  };

  Game.prototype.placeMark = function (pos) {
    this.bigBoard[this.currBoardNum[0]][this.currBoardNum[1]][pos[0]][pos[1]] = this.player;
  };

  Game.prototype.switchPlayer = function () {
    if (this.player === Game.marks[0]) {
      this.player = Game.marks[1];
    } else {
      this.player = Game.marks[0];
    }
  };

  Game.prototype.valid = function (strCoords) {
    // Check to see if the co-ords are on the board and the spot is
    // empty.
    var pos = eval(strCoords);

    function isInRange (pos) {
      return (0 <= pos) && (pos < 3);
    }

    return _(pos).all(isInRange) && _.isNull(this.bigBoard[this.currBoardNum[0]][this.currBoardNum[1]][pos[0]][pos[1]]);
  };

  Game.prototype.verticalWinner = function (board) {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (j) {
        return _(indices).every(function (i) {
          return board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.winner = function (board) {
    return (
      this.diagonalWinner(board) || this.horizontalWinner(board) || this.verticalWinner(board)
    );
  };
})(this);

var TTT = new this.TTT.Game();