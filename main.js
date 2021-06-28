// # Animation
// rAF loop toggle

const createLoop = (callback) => {
  if (callback === undefined || typeof callback !== "function") {
    throw TypeError("Missing callback")
  }

  // Minifies better on account of being used more than once
  const scheduleRequest = fn => window.requestAnimationFrame(fn)

  // Track last entry in callback list, idle if `undefined`
  let requestId

  // Schedule work on each frame
  const loop = (elapsed) => {
    callback(elapsed, requestId)

    // Skip if idle
    if (requestId) {
      requestId = scheduleRequest(loop)
    }
  }

  // Get going, but make sure calls don't stack up
  const play = () => {
    requestId = requestId || scheduleRequest(loop)

    return requestId
  }

  // Turn off if running
  const stop = () => {
    requestId = requestId && window.cancelAnimationFrame(requestId)

    return requestId
  }

  return { start: play, stop, play, pause: stop }
}

export default createLoop
