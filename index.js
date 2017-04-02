'use strict';

// # Animation
// rAF loop toggle

var Animation = function Animation(callback) {
  if (callback === undefined || typeof callback !== 'function') {
    throw TypeError('Missing valid callback');
  }

  // Track progress
  var frameId = void 0;

  // Next
  var tick = function tick(fn) {
    return window.requestAnimationFrame(fn);
  };

  // On each frame
  var loop = function loop() {
    callback(frameId);

    // Skip if idle
    if (frameId) {
      frameId = tick(loop);
    }
  };

  // Turn off if running
  var stop = function stop() {
    frameId = frameId && window.cancelAnimationFrame(frameId);
  };

  // Make sure these don't stack up
  var play = function play() {
    frameId = frameId || tick(loop);
  };

  return { play: play, stop: stop, start: play, pause: stop };
};

module.exports = Animation;
