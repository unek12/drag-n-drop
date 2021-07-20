const places = document.querySelectorAll('.item-place')

function getCords() {
    const cords = []
    for (let i = 0; i < places.length; i++) {
        const current = places[i]
        const cord = {left: current.offsetLeft, top: current.offsetTop}
        cords.push(cord)
    }
    return cords
}

addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'IMG') {
        move(e.target)
    }
})

function move(item) {
    let offsetX
    let offsetY
    let startX
    let startY

    item.onmousedown = (event) => {
        item.style.position = 'absolute'
        item.style.zIndex = '1000'

        offsetX = event.offsetX
        offsetY = event.offsetY

        startX = event.pageX - offsetX
        startY = event.pageY - offsetY

        item.style.top = startY + 'px'
        item.style.left = startX + 'px'

        document.onmousemove = moveAt;
        addEventListener('mouseup', mouseUp, false)
    }
    const mouseUp = (e) => {
        const cords = getCords()
        const isMatch = cords.findIndex((cord) => cord.left < e.pageX && e.pageX < cord.left + item.width && e.pageY > cord.top && e.pageY < cord.top + item.height)
        if (isMatch > -1 && places[isMatch]?.children[0]?.tagName !== 'IMG') {
            item.parentNode.innerHTML = ''
            places[isMatch].innerHTML = item.outerHTML
            places[isMatch].children[0].style.top = ''
            places[isMatch].children[0].style.left = ''
            places[isMatch].children[0].style.position = 'static'
        } else {
            item.style.top = ''
            item.style.left = ''
            item.style.position = 'static'
        }
        item.style.zIndex = '1'
        document.onmousemove = null;
        removeEventListener('mouseup', mouseUp, false)
    }
    const moveAt = (event) => {
        event.preventDefault()
        item.style.left = event.pageX - offsetX + 'px'
        item.style.top = event.pageY - offsetY + 'px'
    }
}

