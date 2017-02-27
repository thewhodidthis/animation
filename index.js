'use strict';

var Animation = function Animation(callback) {
  var frameId = null;

  var tick = function tick(fn) {
    frameId = window.requestAnimationFrame(fn);
  };

  var loop = function loop(now) {
    callback(now);

    // Skip when turned off
    if (frameId) {
      tick(loop);
    }
  };

  var start = function start() {
    // Make sure these don't stack up
    if (!frameId) {
      tick(loop);
    }
  };

  var stop = function stop() {
    if (frameId) {
      // Turn off, falsify frameId
      frameId = window.cancelAnimationFrame(frameId);
    }
  };

  return {
    start: start,
    stop: stop
  };
};

module.exports = Animation;
