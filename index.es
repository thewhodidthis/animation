function Animation(callback) {
  let frameId;

  const tick = (fn) => {
    frameId = window.requestAnimationFrame(fn);
  };

  const loop = (now) => {
    callback(now);

    // Skip when turned off
    if (frameId) {
      tick(loop);
    }
  };

  const start = () => {
    // Make sure these don't stack up
    if (!frameId) {
      tick(loop);
    }

    return this;
  };

  const stop = () => {
    if (frameId) {
      // Turn off, falsify frameId
      frameId = window.cancelAnimationFrame(frameId);
    }

    return this;
  };

  return {
    start,
    stop
  };
}

export default Animation;
