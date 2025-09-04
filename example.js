import animation from "./main.js"

const TAU = Math.PI * 2
const DEG = TAU / 360

const canvas = document.querySelector("canvas")
const { width: w, height: h } = canvas
const target = canvas.getContext("2d", { alpha: false })

target.fillStyle = "white"

const tree = createTree()
const makePoints = () => tree(0, 0, 9, 270 * DEG)

const points = []

// Draw from center bottom.
target.translate(w * 0.5, h - 5)

animation(() => {
  if (points.length === 0) {
    // Need refill points array.
    Array.prototype.push.apply(points, makePoints())
  }

  // Draw one point per animation frame.
  const { x, y, r } = points.shift()

  target.fillRect(Math.round(x), Math.round(y), Math.floor(r), Math.floor(r))
}).start()

canvas.addEventListener("click", () => {
  target.clearRect(-w * 0.5, -h, w, h)

  // Reset points array on next tick.
  points.length = 0
})

// Adapted from Foggy Tree by Chris Coyne:
// http://www.contextfreeart.org/gallery/view.php?id=4
function createTree(lottery = [0.05, 0.1], angles = { a: DEG, b: 40 * DEG }) {
  const data = []
  const generator = (x1, y1, radius, angle, lotteryIndex = 0) => {
    if (radius > 1) {
      const forkMaybe = Math.random() < lottery[lotteryIndex]

      let x2 = Math.cos(angle)
      let y2 = Math.sin(angle)

      data.push({ x: x1, y: y1, r: radius })

      if (forkMaybe) {
        const nextLotteryIndex = (lotteryIndex + 1) % lottery.length

        x2 += x1
        y2 += y1

        generator(x2, y2, radius * 0.9, angle + angles.a, nextLotteryIndex)
        generator(x2, y2, radius * 0.6, angle + angles.b, lotteryIndex)
        generator(x2, y2, radius * 0.5, angle - angles.b, nextLotteryIndex)
      } else {
        const nextAngle = lotteryIndex === 0 % 2 ? angle - angles.a : angle + angles.a

        x2 *= radius
        y2 *= radius

        x2 += x1
        y2 += y1

        generator(x2, y2, radius * 0.98, nextAngle, lotteryIndex)
      }
    }

    return data
  }

  return generator
}
