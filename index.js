'use strict';

// # Animation
// rAF loop toggle

var createLoop = function (callback) {
  if (callback === undefined || typeof callback !== 'function') {
    throw TypeError('Missing callback')
  }

  // Track progress
  var id;

  // Next
  var tick = function (fn) { return window.requestAnimationFrame(fn); };

  // On each frame
  var loop = function (elapsed) {
    callback(id, elapsed);

    // Skip if idle
    if (id) {
      id = tick(loop);
    }
  };

  // Turn off if running
  var stop = function () {
    id = id && window.cancelAnimationFrame(id);

    return id
  };

  // Make sure these don't stack up
  var play = function () {
    id = id || tick(loop);

    return id
  };

  return { play: play, stop: stop, start: play, pause: stop }
};

module.exports = createLoop;

