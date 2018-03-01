// # Animation
// RAF loop toggle

const createLoop = (tick) => {
  if (tick === undefined || typeof tick !== 'function') {
    throw TypeError('Missing callback')
  }

  // Schedule
  const next = fn => window.requestAnimationFrame(fn)

  // Track progress
  let id

  // On each frame
  const loop = (elapsed) => {
    tick(id, elapsed)

    // Skip if idle
    if (id) {
      id = next(loop)
    }
  }

  // Turn off if running
  const stop = () => {
    id = id && window.cancelAnimationFrame(id)

    return id
  }

  // Make sure these don't stack up
  const play = () => {
    id = id || next(loop)

    return id
  }

  return { play, stop, start: play, pause: stop }
}

export default createLoop
