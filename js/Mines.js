'use strict';

function createMines(count) {
    while (gMinesLocations.length < count) {
        createMine(gBoard, gMinesLocations)
    }
}

function createMine(board) {
    var location = {
        randIdxI: getRandomInt(0, board.length),
        randIdxJ: getRandomInt(0, board.length)
    }
    board[location.randIdxI][location.randIdxJ] = {
        isShown: false,
        isMine: true,
        isMarked: false
    }
    
    // preventing dubbles
    if (!gMinesLocations.some(loc=> locationMatch(loc, location))){
     gMinesLocations.push(location)
    }
}


function locationMatch(a, b) {
    return a.randIdxI === b.randIdxI && a.randIdxJ === b.randIdxJ
}