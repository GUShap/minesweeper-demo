
function getRandomInt(min, max) {
    var rand = Math.floor(Math.random() * (max - min) + min)
    return rand
}

function countMinesAround(board, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        // not outside mat
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // not outside mat
            if (j < 0 || j > board[0].length - 1) continue;

            // not on selected pos
            if (i === rowIdx && j === colIdx) continue;

            if (board[i][j].isMine) count++;
            // else mat[i][j]
        }
    }
    return count;
}

function createBoard(ROWS, COLS) {
    var board = []
    for (var i = 0; i < ROWS; i++) {
        board[i] = []
        for (var j = 0; j < COLS; j++) {
            board[i].push('')
            board[i][j] = {
                isShown: false,
                isMine: false,
                isMarked: false,
                minesAroundCount: null
            }
        }
    }
    return board
}


function setTimer() {
    var startTime = new Date();
    gInterval = setInterval(getTime, 1000)

    function getTime() {
        var txt = 'time\n'
        var time = new Date()
        var timeDiff = time - startTime
        var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

        minutes = (minutes < 10) ? '0' + minutes : minutes
        seconds = (seconds < 10) ? '0' + seconds : seconds

        var elTime = document.querySelector('.stopwatch');
        elTime.innerText = ` ${txt}${minutes}:${seconds}`
    }
}







