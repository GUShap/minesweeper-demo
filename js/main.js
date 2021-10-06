'use strict';

var gGame;

var gBoard;
var gLevel;
var gMinesLocations;
var gMinesCount;
var gLivesCount;

var gClicksCount;
var gSafeClickCount;

var gInterval;
var gHintMode = false;



function init(size, minesCount) {
    clearInterval(gInterval)
    gMinesLocations = [];
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };
    gLevel = {
        SIZE: size,
        MINES: minesCount
    };

    if (minesCount <= 2) gLivesCount = 2
    else gLivesCount = 3;
    gClicksCount = 0
    gSafeClickCount = 3;

    gBoard = createBoard(size, size)
    createMines(minesCount)
    gMinesCount = gMinesLocations.length
    renderAll()


}


function whichButton(event, i, j) {
    if (!gGame.isOn) return
    if (event.which === 1) {
        cellClicked(i, j)
        if (!gClicksCount) gClicksCount++ // cheking for the first click
    }
    else cellMarked(i, j)
}



function cellClicked(i, j) {

    var minesCount = countMinesAround(gBoard, i, j)
    gBoard[i][j].minesAroundCount = minesCount

    if (!gClicksCount) setTimer()


    if (gBoard[i][j].isShown) return //if a crad is already flipped return 

    gBoard[i][j].isShown = true //model
    gGame.shownCount++

    if (gBoard[i][j].isMine) {
        gLivesCount--
        gMinesCount--
        elLives.innerHTML = ``
        renderLives(gLivesCount, '.lives')
        if (!gLivesCount) checkGameOver(false)
    }
    expandShown(gBoard, i, j)
    isWin();
    renderBoard(gBoard, '.board-container')//DOM
}

function cellMarked(i, j) {

    if (gBoard[i][j].isShown) return

    //marked counter
    if (!gBoard[i][j].isMarked) gGame.markedCount++;
    else gGame.markedCount--;

    gBoard[i][j].isMarked = !gBoard[i][j].isMarked//model
    renderBoard(gBoard, '.board-container')//DOM
    if (gGame.markedCount >= gMinesCount) isWin()

}


function checkGameOver(isWin) {
    var elText = elModal.querySelector('span')
    if (!isWin) {
        elModal.classList.add('game-over')
        elText.innerText = 'Game Over'
        clearInterval(gInterval)
    }
    else {
        elModal.classList.add('victory')
        elText.innerText = 'Congratulations,\n You Won!!'
        clearInterval(gInterval)
    }
    elLives.innerHTML = ``
    elModal.style.display = 'block'
    gGame.isOn = false;
    gGame.shownCount = 0;
    gClicksCount = 0;
}


function isWin() {
    var cellsCount = gLevel.SIZE ** 2
    var minesCount = gMinesCount
    var markedCount = gGame.markedCount
    var flippedCount = gGame.shownCount;

    // console.log(gMinesCount);
    // console.log(cellsCount-minesCount);

    if (markedCount === minesCount && flippedCount === cellsCount - minesCount) {
        checkGameOver(true)
    }


}

// non recursive
function expandShown(board, rowIdx, colIdx) {
    var cell = board[rowIdx][colIdx]
    if (cell.isMine || cell.minesAroundCount) return

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        // not outside mat
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // not outside mat
            if (j < 0 || j > board[0].length - 1) continue;
            // not on selected pos
            if (i === rowIdx && j === colIdx) continue;

            board[i][j].minesAroundCount = countMinesAround(board, i, j)
            if (!board[i][j].isShown) gGame.shownCount++
            board[i][j].isShown = true

            if (!board[i][j].isMine && !board[i][j].isShown) expandShown(board, i, j)
        }
    }
}



// function firstClick(i, j) {
//     if (gClicksCount) return

//     gBoard[i][j] = {
//         isShown: false,
//         isMine: false,
//         isMarked: false,
//         minesAroundCount: countMinesAround(gBoard, i, j)
//     }
//     renderBoard(gBoard, '.board-container')
// }


function hintMode() {
    gHintMode = true
    renderBoard(gBoard, '.board-container')
}


function getHint(rowIdx, colIdx) {
    gHintsleft--;
    console.log(gHintsleft);
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // console.log('dd');
            if (j < 0 || j > gBoard[0].length - 1) continue;
            gBoard[i][j].minesAroundCount = countMinesAround(gBoard, i, j)
            gBoard[i][j].isShown = true
        }
    }
    renderBoard(gBoard, '.board-container')
    console.log(gHintMode);

    setTimeout(function () {

        for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
            if (i < 0 || i > gBoard.length - 1) continue;
            for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                // console.log('dd');
                if (j < 0 || j > gBoard[0].length - 1) continue;
                gBoard[i][j].isShown = false
            }
        }
        renderBoard(gBoard, '.board-container')
    }, 1000)
    gHintMode = false
    renderHints()
}


