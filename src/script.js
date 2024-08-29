const input = document.getElementById('input')
const grid = document.getElementById('grid')

const hoverEffect = (id) => {
    const item = document.getElementById(id)
    item.style.backgroundColor = `rgb(${Math.floor(
        Math.random() * 255
    )} ${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)})`
}

const resetGridItemColor = () => {
    const gridItems = Array.from(document.querySelectorAll('.gridItem'))
    gridItems.map((item) => (item.style.backgroundColor = 'rgb(255 255 255'))
}

const setGridItemWidth = () => {
    const gridItems = Array.from(document.querySelectorAll('.gridItem'))

    const maxWidth =
        window.innerWidth < window.innerHeight
            ? Math.min(window.innerWidth - 32, 768)
            : Math.min(window.innerHeight - 32, 768)

    console.log(maxWidth)

    gridItems.map(
        (item) => (item.style.width = `${maxWidth / parseInt(input.value)}px`)
    )
}

const generateGrid = (gridSize) => {
    grid.replaceChildren()

    for (let i = 0; i < gridSize; i++) {
        const elem = document.createElement('div')
        elem.className = 'gridRow'
        for (let j = 0; j < gridSize; j++) {
            const item = document.createElement('div')
            item.className = 'gridItem'
            item.id = `gridItem-${i}-${j}`
            item.style.width = `${
                (window.innerWidth < window.innerHeight
                    ? Math.min(window.innerWidth - 32, 768)
                    : Math.min(window.innerHeight - 32, 768)) /
                parseInt(input.value)
            }px`
            item.addEventListener('mouseover', () => hoverEffect(item.id))
            item.addEventListener('click', () => hoverEffect(item.id))
            elem.appendChild(item)
        }
        setGridItemWidth()
        grid.appendChild(elem)
    }
}

const focusTrap = (event) => {
    if (event.key !== 'Tab') return

    const focusableElements = Array.from(
        document.querySelectorAll('button, input')
    )
    const firstFocusableElement = focusableElements[0]
    const lastFocusableElement = focusableElements.at(-1)

    if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
            event.preventDefault()
            lastFocusableElement?.focus()
        }
    } else if (document.activeElement === lastFocusableElement) {
        event.preventDefault()
        firstFocusableElement?.focus()
    }
}

generateGrid(parseInt(input.value))

input.addEventListener('change', () => generateGrid(parseInt(input.value)))
window.addEventListener('resize', setGridItemWidth)
document.addEventListener('keydown', focusTrap)
