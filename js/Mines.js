'use strict';

function createMines(count) {
    for (var i = 0; i < count; i++) {
        createMine(gBoard)
        console.log(count);
    }
}

function createMine(board) {
    var randIdxI = getRandomInt(0, board.length - 1)
    var randIdxJ = getRandomInt(0, board.length - 1)
    board[randIdxI][randIdxJ] = {
        isShown: false,
        isMine: true,
        isMarked: false
    }
    gMinesLocations.push({i:randIdxI ,j:randIdxJ})
}