'use strict';

function createMines(count) {
    for (var i = 0; i < count; i++) {
        createMine(gBoard, gMinesLocations)
    }
}

function createMine(board, minesLocations) {
    var randIdxI = getRandomInt(0, board.length - 1)
    var randIdxJ = getRandomInt(0, board.length - 1)
    minesLocations = gMinesLocations
    for (var i = 0; i < minesLocations.length; i++) {
        if (minesLocations[i].i === randIdxI && minesLocations.j === randIdxJ) continue
    }

    board[randIdxI][randIdxJ] = {
        isShown: false,
        isMine: true,
        isMarked: false
    }
    gMinesLocations.push({ i: randIdxI, j: randIdxJ })
}