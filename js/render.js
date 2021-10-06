'use strict';

var elModal = document.querySelector('.modal')
var elLives = document.querySelector('.lives')
var elTime = document.querySelector('.stopwatch')
var elFace = document.querySelector('.face')
var elHints = document.querySelector('.hint')
var elSafeBtn = document.querySelector('.safe')

var gHintsleft;

function renderAll() {

    elModal.classList.remove('game-over', 'victory');
    elModal.style.display = 'none'
    elLives.innerHTML = ''
    elTime.innerText = 'time\n00:00'
    elSafeBtn.innerText = '3 Safe Clicks left'

    gHintsleft = 3

    renderLives(gLivesCount, '.lives')
    renderHints()
    renderBoard(gBoard, '.board-container')
}


function renderLives(count, selector) {
    var elContainer = document.querySelector(selector);
    var strHTML = ` `
    for (var i = 0; i < count; i++) {
        strHTML += `<div class="life"></div>`
    }
    elContainer.innerHTML += strHTML;

    if (count > 2 || (count === 2 && gLevel.MINES === 2)) elFace.innerText = '😃'
    else if (count === 2) elFace.innerText = '🤕'
    else if (count === 1) elFace.innerText = '🤯'
    else if (count < 1) elFace.innerText = '☠️'
}


function renderBoard(board, selector) {
    var strHTML = '<table class ="table" border="1"><tbody>';//the bord will show only with border>0
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];

            if (cell.isMine) cell.minesAroundCount = 0;

            var className = `cell cell${i}-${j}`;

            if (cell.isMine && cell.isShown) className += ` mine`
            else if (cell.isMarked) className += ` marked`

            if (cell.isShown) {
                if (!cell.minesAroundCount) strHTML += `<td class="${className}">${''}</td>`
                else strHTML += `<td class="${className}">${cell.minesAroundCount}</td>`;
            }
            else {
                if (gHintMode) {
                    strHTML += `<td class="${className} back" onclick="getHint(${i},${j})">${''}</td>`
                } else strHTML += `<td class="${className} back" onmouseup="whichButton(event,${i},${j})">${''}</td>`
            }
        }

        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}



function faceClick() {
    if (gLevel.SIZE === 4) init(4, 2)
    else if (gLevel.SIZE === 8) init(8, 12)
    else if (gLevel.SIZE === 12) init(12, 30)
}

function renderHints() {
    elHints.innerText = (gHintsleft) ? `${gHintsleft} Hints` : `No Hints`;
}

function findSafeCell() {
    if (!gSafeClickCount) return
    var safeCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var location = {
                i: i,
                j: j
            }
            if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) {
                if (!safeCells.some(loc => locationMatch(loc, location))) {
                    safeCells.push(location)
                }
            }
        }
    }
    var rand = getRandomInt(0, safeCells.length)
    var safeCell = safeCells[rand]
    gSafeClickCount--
    renderCell(safeCell.i, safeCell.j)
}


function renderCell(i, j) {
    var elCell = document.querySelector(`.cell${i}-${j}`);
    elCell.style.backgroundColor = 'rgba(176, 196, 222)'
    elSafeBtn.innerText = (gSafeClickCount) ? `${gSafeClickCount} Safe Clicks left` : `No Safe Clicks left`

}