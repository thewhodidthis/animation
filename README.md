## about

Scheduling regular updates in the interest of creating [smooth running](https://dev.opera.com/articles/better-performance-with-requestanimationframe) browser animations might conceivably look a bit like:

```js
// Start
window.requestAnimationFrame(loop)

function loop(now) {
  console.log(`update called ${now}ms into current document's lifetime`)

  // Repeat endlessly?
  window.requestAnimationFrame(loop)
}
```

Ending that loop on demand such as when [debouncing mouse events](https://www.html5rocks.com/en/tutorials/speed/animations/#debouncing-mouse-events) would involve keeping track of each `requestAnimationFrame` or rAF index to then be calling [`cancelAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame) with. For example,

```js
// Start
let frame = window.requestAnimationFrame(loop)

function loop() {
  // Update
  frame = window.requestAnimationFrame(loop)
}

function stop() {
  if (frame) {
    // Unassign, make falsy again
    frame = window.cancelAnimationFrame(frame)
  }

  console.assert(frame === undefined)
}

document.addEventListener("click", stop, { once: true })
```

This module is essentially a closure around that otherwise free roaming frame reference. It includes no polyfill and minifies to less than half a kilobyte.

## setup

Load via script tag:

```html
<!-- Just an IIFE namespaced `animation` -->
<script src="https://thewhodidthis.github.io/animation/animation.js"></script>
```

Source from an import map:

```json
{
  "imports": {
    "@thewhodidthis/animation": "https://thewhodidthis.github.io/animation/main.js"
  }
}
```

Download from GitHub directly if using a package manager:

```sh
# Add to package.json
npm install thewhodidthis/animation
```

## usage

The default and only export is an anonymous function expecting a callback argument to be invoked before the next repaint, same as using rAF directly. In line with the [revealing module pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript) you get an object literal with `start()` and `stop()` methods in return. These are aliased _play_ and _pause_ respectively.

```js
import createLoop from "@thewhodidthis/animation"

let frameId

const animationKeys = ["start", "stop", "play", "pause"]
const animation = createLoop((now, id) => {
  console.assert(frameId === id)

  frameId = animation.stop()

  console.assert(frameId === undefined)
})

console.assert(Object.keys(animation).every(k => animationKeys.includes(k)))

frameId = animation.start()
```

The callback is passed a [`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp) and the frame reference. Just in case, checks are included to allow for running multiple loops in parallel.

```js
const startFrame = animation.start()
const startAgainFrame = animation.start()

console.assert(startFrame === startAgainFrame)
```
