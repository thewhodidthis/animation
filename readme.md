Scheduling regular updates in the interest of creating [smooth running](https://dev.opera.com/articles/better-performance-with-requestanimationframe/) browser animations in JS might  
conceivably look a bit like,

```js
// Start
window.requestAnimationFrame(loop)

function loop(now) {
  console.log(`update called ${now}ms into current document's lifetime`)

  // Repeat endlessly?
  window.requestAnimationFrame(loop)
}
```

Ending that loop on demand such as when [debouncing mouse events](https://www.html5rocks.com/en/tutorials/speed/animations/#debouncing-mouse-events) would involve keeping track of each `requestAnimationFrame` or _rAF_ index to then be calling `cancelAnimationFrame` with,

```js
// Start
let frameIndex = window.requestAnimationFrame(loop)

function loop() {
  // Update
  frameIndex = window.requestAnimationFrame(loop)
}

function stop() {
  if (frameIndex) {
    // Unassign, make falsy again
    frameIndex = window.cancelAnimationFrame(frameIndex)
  }

  console.assert(frameIndex === undefined)
}

document.addEventListener('click', stop, { once: true })
```

This module is essentially a closure around that otherwise free roaming frame reference. It includes no polyfill and minifies to less than half a kilobyte.

```sh
# Includes ES and CJS versions
npm i @thewhodidthis/animation
```

The default and only export is an anonymous function requiring a callback argument to be invoked before the next repaint, same as using _rAF_ directly. In line with the [revealing module pattern](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript) expect an anonymous object with `start()`  and `stop()` methods attached and aliased play / pause respectively.

```js
import createLoop from '@thewhodidthis/animation'

let frameIndexMaybe

const animation = createLoop((now, frameIndex) => {
  console.assert(frameIndexMaybe === frameIndex)

  frameIndexMaybe = animation.stop()

  console.assert(frameIndexMaybe === undefined)
})

console.assert(Object.keys(animation).every(k => ['start', 'stop', 'play', 'pause'].includes(k)))

frameIndexMaybe = animation.start()
```

The callback is passed a [`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp) and the frame reference. Just in case, checks are included to allow for running multiple loops in parallel.
