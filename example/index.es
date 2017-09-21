import createLoop from '../index.mjs'

const list = document.querySelector('ul')
const bits = document.getElementsByTagName('li')

const emojiCodes = '😁,😂,😃,😄,😠,😆,😉,😊,😋,😌,😏,😜'
const emoji = emojiCodes.split(',')
const emojiTotal = emoji.length
const cellsTotal = 60

// Show in order
const setup = createLoop(() => {
  const currentTotal = bits.length

  const item = bits[currentTotal - 1]
  const seed = Math.floor(Math.random() * emojiTotal)

  item.setAttribute('data-content', emoji[seed])
  list.appendChild(item.cloneNode(true))

  if (currentTotal >= cellsTotal - 1) {
    setup.stop()
  }
})

let target

const hoops = createLoop((frame) => {
  if (frame % 5 === 0) {
    target.setAttribute('data-content', emoji[frame % emojiTotal])
  }
})

// Track mouse position
const track = createLoop(() => {
  hoops.play()
  track.stop()
})

list.addEventListener('mousemove', (e) => {
  if (!e.target.getAttribute('data-content') || target !== e.target) {
    hoops.stop()
  } else {
    track.play()
  }

  target = e.target
})

list.addEventListener('mouseleave', () => {
  hoops.stop()
  track.stop()
})

window.addEventListener('load', setup.start)
