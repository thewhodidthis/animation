// # Animation
// rAF loop toggle

const Animation = (callback) => {
  if (callback === undefined || typeof callback !== 'function') {
    throw TypeError('Missing valid callback');
  }

  // Is running flag
  let frameId = null;

  // Frame
  const tick = (fn) => {
    // Mark frame
    frameId = window.requestAnimationFrame(fn);
  };

  // On each frame
  const loop = (now) => {
    callback(now);

    // Pause if idle
    if (frameId) {
      tick(loop);
    }
  };

  // Turn off
  const stop = () => {
    // Make sure it's running
    if (frameId) {
      // Falsify frame
      frameId = window.cancelAnimationFrame(frameId);
    }
  };

  // Kick off
  const start = () => {
    // Make sure these don't stack up
    if (!frameId) {
      tick(loop);
    }

    return frameId;
  };

  return {
    play: start,
    pause: stop,
    start,
    stop,
  };
};

export default Animation;

