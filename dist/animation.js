var Animation = (function () {
  'use strict';

  // # Animation
  // rAF loop toggle

  var Animation = function Animation(callback) {
    if (callback === undefined || typeof callback !== 'function') {
      throw TypeError('Missing valid callback');
    }

    // Is running flag
    var frameId = null;

    // Frame
    var tick = function tick(fn) {
      // Mark frame
      frameId = window.requestAnimationFrame(fn);
    };

    // On each frame
    var loop = function loop(now) {
      callback(now);

      // Pause if idle
      if (frameId) {
        tick(loop);
      }
    };

    // Turn off
    var stop = function stop() {
      // Make sure it's running
      if (frameId) {
        // Falsify frame
        frameId = window.cancelAnimationFrame(frameId);
      }
    };

    // Kick off
    var start = function start() {
      // Make sure these don't stack up
      if (!frameId) {
        tick(loop);
      }

      return frameId;
    };

    return {
      play: start,
      pause: stop,
      start: start,
      stop: stop
    };
  };

  return Animation;

}());
//# sourceMappingURL=animation.js.map
