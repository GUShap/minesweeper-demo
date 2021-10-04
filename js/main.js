'use strict';

var gGame;
var gBoard;
var gLevel;
var gMinesLocations;
var gEmptyCells;
var gLives;

var gClicksCounter = 0;

var elCell = document.querySelector('.cell')

function init(size, minesCount) {
    gMinesLocations = []
    gLevel = {
        SIZE: size,
        MINES: minesCount
    }
    gEmptyCells=[]
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
        cellClicked(elCell, i, j)
        if (!gClicksCounter) gClicksCounter++ // cheking for the first click
    }

    else cellMarked(elCell, i, j)
}



function cellClicked(elCell, i, j) {
    elCell = document.querySelector('.cell')
    if (gBoard[i][j].isShown) return //if a crad is already flipped return 

    gBoard[i][j].isShown = true //model
    if (!gBoard[i][j].minesAroundCount){

    }
        renderBoard(gBoard, '.board-container')//DOM
}

function cellMarked(elCell, i, j) {
    if (gBoard[i][j].isShown) return
    elCell = document.querySelector('.cell')

    gBoard[i][j].isMarked = !gBoard[i][j].isMarked//model

    renderBoard(gBoard, '.board-container')//DOM
}

// function expandShown()



// function checkGameOver() {
// }