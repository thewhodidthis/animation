// # Animation
// RAF loop toggle

const createLoop = (callback) => {
  if (callback === undefined || typeof callback !== 'function') {
    throw TypeError('Missing callback')
  }

  // Track progress
  let id

  // Next
  const tick = fn => window.requestAnimationFrame(fn)

  // On each frame
  const loop = (elapsed) => {
    callback(id, elapsed)

    // Skip if idle
    if (id) {
      id = tick(loop)
    }
  }

  // Turn off if running
  const stop = () => {
    id = id && window.cancelAnimationFrame(id)

    return id
  }

  // Make sure these don't stack up
  const play = () => {
    id = id || tick(loop)

    return id
  }

  return { play, stop, start: play, pause: stop }
}

export default createLoop
