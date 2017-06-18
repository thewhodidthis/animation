'use strict';

// # Animation
// rAF loop toggle

var createLoop = function createLoop(callback) {
  if (callback === undefined || typeof callback !== 'function') {
    throw TypeError('Missing callback');
  }

  // Track progress
  var id = void 0;

  // Next
  var tick = function tick(fn) {
    return window.requestAnimationFrame(fn);
  };

  // On each frame
  var loop = function loop(elapsed) {
    callback(id, elapsed);

    // Skip if idle
    if (id) {
      id = tick(loop);
    }
  };

  // Turn off if running
  var stop = function stop() {
    id = id && window.cancelAnimationFrame(id);

    return id;
  };

  // Make sure these don't stack up
  var play = function play() {
    id = id || tick(loop);

    return id;
  };

  return { play: play, stop: stop, start: play, pause: stop };
};

module.exports = createLoop;
