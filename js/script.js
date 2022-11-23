'use strict'

var elBoard = document.querySelector('.board')
var gBoard = []



var gLevel = { SIZE: 0, MINES: 0 };

var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }

function onInit(SIZE, MINES) {
    console.log('init')
    gGame.isOn = false
    gLevel.SIZE = SIZE
    gLevel.MINES = MINES
    buildBoard()

}

function buildBoard() {
    gBoard = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        var newLine = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false }
            newLine.push(cell)
        }
        gBoard.push(newLine)
    }
    renderBoard(gBoard)
}

function renderBoard(board) {
    var strHtml = '<table>'
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            var cell = renderCell(i, j)
            strHtml += cell
        }
        strHtml += '</tr>'
    }
    strHtml += '</table>'
    elBoard.innerHTML = strHtml
    console.log(gBoard)
}

function renderCell(i, j) {
    var html = ''
    if (gBoard[i][j].isShown === false) {
        html += `<td><div class="cell " data-i = ${i} data-j= ${j} onclick="cellClicked(this,${i}, ${j})"></div> </td>`
    } else {
        if (gBoard[i][j].isMine === true) {
            html += `<td><div class="cell" data-i = ${i} data-j= ${j} onclick="cellClicked(this,${i}, ${j})">💣</div> </td>`
        } else {
            if (gBoard[i][j].minesAroundCount === 0) {
                html += `<td><div class="cellclicked" data-i = ${i} data-j= ${j} onclick="cellClicked(this, ${i}, ${j})"></div> </td>`

            } else {
                html += `<td><div class="cellclicked" data-i = ${i} data-j= ${j} onclick="cellClicked(this,${i}, ${j})"> ${gBoard[i][j].minesAroundCount}</div> </td>`

            }
        }
    }
    return html
}

function cellClicked(elCell, i, j) {

    var currCell = gBoard[i][j]
    //clickedBtnStyle(currcell, htmlCell)

    if (gGame.isOn === false) {
        currCell.isShown = true
        makeMines()
        setMinesNegsCount(gBoard)
        gGame.isOn = true
    }

    if (currCell.isMine === true) {
        currCell.isShown = true
        console.log('game over')
    } else {
        currCell.isShown = true
        expandShown(gBoard, i, j)
    }
    
    renderBoard(gBoard)
}

function makeMines() {

    var numOfMines = 0
    while (numOfMines < gLevel.MINES) {

        var randI = getRandomInt(0, gLevel.SIZE - 1)
        var randJ = getRandomInt(0, gLevel.SIZE - 1)
        if (gBoard[randI][randJ].isShown === false && gBoard[randI][randJ].isMine === false) {

            gBoard[randI][randJ].isMine = true
            numOfMines++
        }
    }
    renderBoard(gBoard)
}

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var rowIdx = i
            var colIdx = j
            var mainesCount = 0

            for (var x = rowIdx - 1; x <= rowIdx + 1; x++) {
                if (x < 0 || x >= board.length) continue
                for (var y = colIdx - 1; y <= colIdx + 1; y++) {
                    if (x === rowIdx && y === colIdx) continue
                    if (y < 0 || y >= board[0].length) continue
                    if (gBoard[x][y].isMine === true) mainesCount++
                }
            }
            board[i][j].minesAroundCount = mainesCount
        }
    }
    return mainesCount

}

function expandShown(board, i, j) {
    var rowIdx = i
    var colIdx = j
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {

        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {

            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            
            if(gBoard[i][j].isMine) continue
            gBoard[i][j].isShown = true
        }
    }
}

// function checkGameOver(){
//     if(gGame.shownCount === gLevel.SIZE*gLevel.SIZE)
// }

