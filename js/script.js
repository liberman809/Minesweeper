'use strict'

var elBoard = document.querySelector('.board')
var gBoard = []
var gUndoBank = {}
document.addEventListener("contextmenu", e => e.preventDefault());

var gLevel = { SIZE: 0, MINES: 0 };

var gGame = { Turn: 0, Lives: 3, isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var elImjBtn
var maines

var eTimer
var timerInterval
var sec = 0
var min = 0
var elLives

function onInit(SIZE, MINES) {
    eTimer = document.querySelector('.timer')

    elImjBtn = document.querySelector('.emoji')
    gUndoBank = []

    gGame.Lives = 3
    gGame.markedCount = 0
    gGame.shownCount = 0
    gGame.secsPassed = 0
    gGame.isOn = false
    gLevel.SIZE = SIZE
    gLevel.MINES = MINES
    elImjBtn.innerText = '😃'

    elLives = document.querySelector('.lives')
    elLives.style.color = "red"



    clearInterval(timerInterval)
    sec = 0
    min = 0
    eTimer.innerHTML = '00:00'
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
    setLivesHTML()
    checkGameOver()
    console.log(gBoard)


    elBoard.innerHTML = strHtml

}

function renderCell(i, j) {
    var html = ''
    if (gBoard[i][j].isShown === false) {
        if (gBoard[i][j].isMarked === false) {
            html += `<td><div class="cell" oncontextmenu="cellMarked(${i}, ${j})" data-i = ${i} data-j= ${j} onclick="cellClicked(this,${i}, ${j})"></div> </td>`
        } else {
            html += `<td><div class="cell" oncontextmenu="cellMarked(${i}, ${j})" data-i = ${i} data-j= ${j} onclick="cellClicked(this,${i}, ${j})">🚩</div> </td>`
        }

    } else {
        if (gBoard[i][j].isMine === true) {
            html += `<td><div class="cell cell-maine"  data-i = ${i} data-j= ${j} onclick="cellClicked(this,${i}, ${j})">💣</div> </td>`
        } else {
            if (gBoard[i][j].minesAroundCount === 0) {
                html += `<td><div class="cell cellclicked cell${i}${j} " data-i = ${i} data-j= ${j} onclick="cellClicked(this,${i}, ${j})"></div> </td>`

            } else {
                html += `<td><div class="cell cellclicked  cell${i}${j}" data-i = ${i} data-j= ${j} onclick="cellClicked(this,${i}, ${j})"> ${gBoard[i][j].minesAroundCount}</div> </td>`

            }
        }
    }
    return html
}

function cellClicked(cell, i, j) {


    var currCell = gBoard[i][j]
    // checkGameOver()


    if (gGame.isOn === false) {
        currCell.isShown = true
        timerInterval = setInterval(timer , 1000) 
        makeMines()
        setMinesNegsCount(gBoard)
        gGame.isOn = true
    }

    if (currCell.isMine === true) {
        currCell.isShown = true
        gGame.Lives--
        elImjBtn.innerText = '🤯'
    } else {
        currCell.isShown = true
        expandShown(gBoard, i, j)
    }
    gGame.shownCount++
    renderBoard(gBoard)
}

function makeMines() {
    maines = []
    var numOfMines = 0
    while (numOfMines < gLevel.MINES) {

        var randI = getRandomInt(0, gLevel.SIZE - 1)
        var randJ = getRandomInt(0, gLevel.SIZE - 1)
        if (gBoard[randI][randJ].isShown === false && gBoard[randI][randJ].isMine === false) {

            gBoard[randI][randJ].isMine = true
            numOfMines++
            maines.push(gBoard[randI][randJ])
        }
    }
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
}

function expandShown(board, i, j) {
    var rowIdx = i
    var colIdx = j
    if (gBoard[i][j].minesAroundCount === 0) {
        for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {

            if (i < 0 || i >= board.length) continue

            for (var j = colIdx - 1; j <= colIdx + 1; j++) {

                if (i === rowIdx && j === colIdx) continue
                if (j < 0 || j >= board[0].length) continue

                gBoard[i][j].isShown = true
                gGame.shownCount++

            }
        }
    }
}


function checkGameOver() {
    var cells = gLevel.SIZE * gLevel.SIZE - gGame.markedCount


    if (gGame.shownCount === cells) {
        var mineCounter = countMarked()
        if (mineCounter === gLevel.MINES) {

            elImjBtn.innerText = '😎'
            clearInterval(timerInterval)
        }
        
    }
    if (gGame.Lives === 0) {
        gGame.gameOver = true
        elImjBtn.innerText = '💀'
        clearInterval(timerInterval)
    }

}

function countMarked() {
    var maincounter = 0
    for (var i = 0; i < maines.length; i++) {
        if (maines[i].isMarked) maincounter++
    }
    return maincounter
}

function setLivesHTML() {
    var heartsStr = ''
    elLives = document.querySelector('.lives')
    for (var i = 0; i < gGame.Lives; i++) {
        heartsStr += '❤'
    }
    if (gGame.Lives === 0) {
        heartsStr += 'Game Over'
        elLives.style.color = "black"
    }
    elLives.innerText = heartsStr
}

function cellMarked(i, j) {
    if (gBoard[i][j].isMarked === false) {
        gGame.markedCount++
        gBoard[i][j].isMarked = true
    } else {
        gGame.markedCount--
        gBoard[i][j].isMarked = false
    }
    renderBoard(gBoard)
}



function timer(){
    eTimer = document.querySelector('.timer')
    if(sec < 10) eTimer.innerText = '00:0' + sec
    if(sec >= 10) eTimer.innerText = '00:' + sec

    if(sec > 59){
        sec= 0
        min ++
    } 
    

    if(min > 0){
        if(sec < 10) eTimer.innerText = '0' + min + ':0' + sec
        if(sec >= 10) eTimer.innerText = '0' + min + ':' + sec

    } 
    if(min >= 10) eTimer.innerText = min + ':' + sec
    sec++
}
   