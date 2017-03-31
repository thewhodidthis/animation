// # Animation
// rAF loop toggle

const Animation = (callback) => {
  if (callback === undefined || typeof callback !== 'function') {
    throw TypeError('Missing valid callback');
  }

  // Track progress
  let frameId;

  // Next
  const tick = fn => window.requestAnimationFrame(fn);

  // On each frame
  const loop = () => {
    callback(frameId);

    // Skip if idle
    if (frameId) {
      frameId = tick(loop);
    }
  };

  // Turn off if running
  const stop = () => {
    frameId = frameId && window.cancelAnimationFrame(frameId);
  };

  // Make sure these don't stack up
  const play = () => {
    frameId = frameId || tick(loop);
  };

  return {
    play,
    stop,
    start: play,
    pause: stop,
  };
};

export default Animation;

