

var gCtx
var gImgId
var gMeme = {}
var gCanvas
var gSelectedLine
var gNumOfLine = 0

function initEditor(imgId, memeImg) {
    gNumOfLine = 1
    changeSection()
    renderEditor()
    gMeme = createMeme(imgId, memeImg)
    setOlaceOlder()
    setFont()
    renderEmojis()
    renderMeme()
}


function changeSection() {

    document.querySelector('.gallery').classList.add("display-none")
    document.querySelector('.editor').style.display = "flex"

}

function setOlaceOlder() {
    document.querySelector('.meme-text').placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
}

function renderMeme() {
    var meme = gMeme.url
    gCanvas = document.getElementById("myCanvas")
    gCtx = gCanvas.getContext("2d")
    gCtx.drawImage(meme, 0, 0, 400, 400)
    renderLines()
}


function renderEmojis() {
    var imj = getEmojiList()
    var strHtml = ''
    imj.forEach(emoj => {
        strHtml += `<div class= "imj" onclick="onAddImj(${emoj.id})">${emoj.emj}</div>`
    })

    document.querySelector('.stickers-menu').innerHTML = strHtml
}

function onAddImj(emoj) {
    addEmoj(emoj)
    renderMeme()
}

function onEditText() {
    editText()
    renderMeme()
}



function onChangefontSize(operator) {
    setFontSize(operator)
    setNewPosition('y', operator)
    renderMeme()
}

function onSetNewPosition(axsis, operator) {
    setNewPosition(axsis, operator)
    renderMeme()
}


function onSetAlign(direction) {
    setAlign(direction)
    renderMeme()
    console.log(gMeme.lines[gMeme.selectedLineIdx].align)
}

function onSetStroke() {
    setStroke()
    renderMeme()
}
function onSetColor() {
    setColor()
    renderMeme()
}

function onSetFont() {
    setFont()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onChangeLine(operator) {
    changeLine(operator)
    renderMeme()
}

function onDeliteLine() {
    deliteLine()
    renderMeme()
}


function onDownloadCanvas(canvas){
    cleanSelected()
    renderMeme()
    downloadCanvas(canvas)
}

function renderEditor() {
    var strHtml = `
        <h3>Edit text</h3>
        <input type="text" onkeyup="onEditText()" class="meme-text" placeholder="text">
        <div class="stickers-menu display-flex"></div>
        
        <div class="editor-menu">
        <div class="first-menu">

        <div class="line-btn">
        <h4>change line</h4>
        <button class="control-btn" onclick="onChangeLine('+')">▲</button>
        <button class="control-btn" onclick="onChangeLine('-')">▼</button>
        </div>
        <div class="line-btn">
        <h4>Add line</h4>
        <button class="control-btn" onclick="onAddLine()"><img src="icons/add.png"
        class="img-btn"></button>
        </div>
        <div class="line-btn">
        <h4>Remove line</h4>
        <button class="control-btn" onclick="onDeliteLine()"><img src="icons/trash.png"
        class="img-btn"></button>
        </div>
        </div>
        <div class="secend-menu">
        <div class="x-pos">
        <h4>x position</h4>
        <button class="control-btn test" onclick="onSetNewPosition('x','-')">◄</button>
        <button class="control-btn" onclick="onSetNewPosition('x','+')">►</button>
        </div>
        <div class="y-pos">
        <h4>y position</h4>
        <button class="control-btn" onclick="onSetNewPosition('y','-')">▲</button>
        <button class="control-btn" onclick="onSetNewPosition('y','+')">▼</button>
        </div>
        </div>
        <div class="third-menu">
        <button class="control-btn" onclick="onChangefontSize('+')"><img
        src="icons/increase font - icon.png" class="img-btn"></button>
        <button class="control-btn" onclick="onChangefontSize('-')"><img
        src="icons/decrease font - icon.png" class="img-btn"></button>
        <button class="control-btn" onclick="onSetAlign('start')"><img src="icons/align-to-left.png"
        class="img-btn"></button>
        <button class="control-btn" onclick="onSetAlign('center')"><img
        src="icons/center-text-alignment.png" class="img-btn"></button>
        <button class="control-btn" onclick="onSetAlign('end')"><img src="icons/align-to-right.png"
        class="img-btn"></button>
        <select name="fonts" class="fonts" onchange="onSetFont()">
        <option value="Impact">Impact</option>
        <option value="Brush Script MT">Brush Script MT</option>
        <option value="Andalé Mono">Andalé Mono</option>
        <option value="Ariel">Ariel</option>
        </select>
        <button class="control-btn" onclick="onSetStroke()"><img src="icons/text stroke.png"
        class="img-btn"></button>
        <input type="color" class="color-picer" onchange="onSetColor()">
        </div>

        <div class="save-menu">
        <button class="save-btn">save</button>
        <button class="save-btn"><a href="#" class="btn" onclick="onDownloadCanvas(this)"
        download="m.jpg">Download meme</a></button>
        </button>
        </div>
        </div>
        `
    document.querySelector('.edit-area').innerHTML = strHtml
    
}






