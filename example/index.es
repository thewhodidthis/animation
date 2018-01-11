import createLoop from '../index.es'

const TAU = Math.PI * 2
const deg = TAU / 360

// Adapted from Foggy Tree by Chris Coyne,
// http://www.contextfreeart.org/gallery/view.php?id=4
/* eslint no-param-reassign: 1 */
const tree = (chances, runs = 0) => {
  const jeez = { a: deg * 1.5, b: deg * 40 }
  const data = []

  const next = (x1, y1, size, turn, tick = chances[runs]) => {
    if (size > 1) {
      data.push({ x: x1, y: y1, r: size })

      let x2 = Math.cos(turn)
      let y2 = Math.sin(turn)

      if (Math.random() > tick) {
        const from = jeez.a
        const head = runs === 0 % 2 ? turn - from : turn + from

        x2 *= size
        y2 *= size

        x2 += x1
        y2 += y1

        next(x2, y2, size * 0.98, head, tick)
      } else {
        const tock = chances[runs]

        runs += 1
        runs %= chances.length

        x2 += x1
        y2 += y1

        next(x2, y2, size * 0.9, turn + jeez.a, tock)
        next(x2, y2, size * 0.6, turn + jeez.b, tick)
        next(x2, y2, size * 0.5, turn - jeez.b, tock)
      }
    }

    return data
  }

  return next
}

const seed = () => {
  const ends = [0.1, 0.05]
  const grow = tree(ends)
  const data = grow(0, 0, 9, deg * 270, 0.05)

  return data
}

const canvas = document.querySelector('canvas')
const target = canvas.getContext('2d')

const { width: w, height: h } = canvas

target.fillStyle = 'white'
target.translate(w * 0.5, h)

let points = seed()

createLoop(() => {
  if (!points.length) {
    points = seed()
  }

  const { x, y, r } = points.shift()

  target.beginPath()
  target.arc(x, y, r * 0.5, 0, TAU)
  target.closePath()
  target.fill()
}).start()

document.addEventListener('click', () => {
  target.clearRect(-w * 0.5, -h, w, h)

  // Start again
  points.length = 0
})
