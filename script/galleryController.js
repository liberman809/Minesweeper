

function galleryInit() {

    
    renderGallery()
}


function renderGallery() {
    var images = filtering()
    var strHtml = ''
    images.forEach(img => {
        strHtml += ` <img src="${img.url}" class="image" onclick= "initEditor(${img.id},this)">`
    })

    document.querySelector('.memes-gallery').innerHTML = strHtml
}

