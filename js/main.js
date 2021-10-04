'use strict';

var gGame;
var gBoard;
var gLevel;
var gMinesLocations;

var gClicksCounter = 0;

var elCell = document.querySelector('.cell')

function init(size, minesCount) {
    gMinesLocations = []
    gLevel = {
        SIZE: size,
        MINES: minesCount
    }
    gBoard = createBoard(size, size)
    createMines(minesCount)
    playGame()
    renderBoard(gBoard, '.board-container')
}

function playGame() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var minesCount = countMinesAround(gBoard, i, j)
            if (minesCount) {
                gBoard[i][j].minesAroundCount = minesCount
            }
        }
    }
}

function whichButton(event, i, j) {
    if (event.which === 1) {
        flipCell(elCell, i, j)
        if (!gClicksCounter) gClicksCounter++ // cheking for the first click
        console.log(gClicksCounter);
    }
    // else markCell()
}



function flipCell(elCell, i, j) {
    elCell = document.querySelector('.cell')
    if (gBoard[i][j].isShown) return //if a crad is already flipped return
    elCell.classList.remove('back')
    // the '.mine' selctor is added in renderBoard() 

    gBoard[i][j].isShown = true

    renderBoard(gBoard, '.board-container')

}

