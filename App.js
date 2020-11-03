
function initialize () {
  var blocks = document.getElementsByClassName('space');
  for(var spaces of blocks) {
    spaces.addEventListener('click',(input) => {
      changestate(input.target);
    })
  }

}


var emptytable = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
  ];

var matrix = {
  turn: true,
  moves:0,
  table: [
  [null, null, null],
  [null, null, null],
  [null, null, null],
  ],

  updatetable: function (row,column) {
    matrix.moves++;
    matrix.table[row][column] = matrix.turn;
    var winchecker = matrix.checkwinner(row,column);
    if(!winchecker && matrix.moves === 9) {
      gameover();
    }
    return winchecker;
  },

  checkrow : function (row, column) {
    var counter = 0;
    for(var value of matrix.table[row]) {
      if(value === matrix.turn) {
        counter ++;
      }
    }
    if(counter === 3) {
      return true;
    }

  },

  checkcolumn : function (row, column) {
    var counter = 0;
    for(var i = 0; i < 3; i++) {

      if(matrix.table[i][column] === matrix.turn) {
        counter ++;
      }
    }
    if(counter === 3) {
      return true;
    }

  },

  checkdiag : function () {
    var Major = 0;
    var Minor = 0;
    for(var j =0 ; j< 3; j++) {
      if(matrix.table[j][j] === matrix.turn) {
        Major ++;
      }
      if(matrix.table[2-j][j] === matrix.turn) {
        Minor ++;
      }
    }
    if(Major === 3 || Minor === 3) {
      return true;
    }
  },

  checkwinner: function (row, column) {
    var functioncalls = [matrix.checkcolumn,matrix.checkrow];
    if((row+column) % 2 === 0) {

      functioncalls.push(matrix.checkdiag);
    }
    for(var i = 0; i < functioncalls.length; i++) {
      var wincheck = functioncalls[i](row, column);
      if(wincheck) {
        return true
      }
    }
    return false;
  }
}


var changestate  = function (elem) {
  if(elem.className === 'space') {
    render(elem);
    var location = elem.id;
    var rowcolumn = [];
    rowcolumn.push(Number(location[0]));
    rowcolumn.push(Number(location[1]));
    if(matrix.updatetable(rowcolumn[0],rowcolumn[1])) {
      gameover(matrix.turn);
    }
    matrix.turn = !matrix.turn;
  }
};

var gameover = function (winner) {
  var title = document.getElementsByClassName('title')
  if(winner !== undefined) {

    if(winner) {
      title[0].textContent = 'X wins the game';
    } else {
      title[0].textContent = 'O wins the game';
    }
  } else {
    title[0].textContent = 'There was no winner';
  }

  setTimeout(restart, 2000);

}


var restart = function () {
  var boxes = document.getElementsByClassName('space');
  for(var i = 0; i< boxes.length; i++) {
    boxes[i].classList.remove('O','X');
  }
  matrix.turn = true;
  matrix.moves = 0;
  matrix.table = emptytable;
  document.getElementsByClassName('title')[0].textContent = 'TIC TAC TOE';
}

var render = function (elem) {
  if(matrix.turn){
    elem.classList.add('X');
  } else {
    elem.classList.add('O');
  }
}
