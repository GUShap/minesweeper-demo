function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getRandomInt(min, max) {
    var rand = Math.floor(Math.random() * (max - min) + min)
    return rand
}

function shuffle(items) {
    var randIdx, keep, i
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1)
        keep = items[i]
        items[i] = items[randIdx]
        items[randIdx] = keep
    }
    return items
}

function countMinesAround(mat, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        // not outside mat
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // not outside mat
            if (j < 0 || j > mat[0].length - 1) continue;

            // not on selected pos
            if (i === rowIdx && j === colIdx) continue;

            if (mat[i][j].isMine) count++;
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
                isMarked: false
            }
        }
    }
    return board
}


function renderBoard(mat, selector) {
    var strHTML = '<table class ="table" border="1"><tbody>';//the bord will show only with border>0
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];

            if(cell.isMine) cell.minesAroundCount = 0;

            var className = `cell cell${i}-${j}`;

            if (cell.isMine && cell.isShown) className += ` mine`
            else if(cell.isMarked) className+=` marked`

            if (cell.isShown) {
                if (cell.minesAroundCount) strHTML += `<td class="${className}">${cell.minesAroundCount}</td>`
                else strHTML += `<td class="${className}">${''}</td>`;
            }
            else strHTML += `<td class="${className} back" onmouseup="whichButton(event,${i},${j})">${''}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(i, j, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${i}-${j}`);
    elCell.innerHTML = value;
}




