var Animation = (function () {
  'use strict';

  function Animation(callback) {
    var _this = this;

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

      return _this;
    };

    var stop = function stop() {
      if (frameId) {
        // Turn off, falsify frameId
        frameId = window.cancelAnimationFrame(frameId);
      }

      return _this;
    };

    return {
      start: start,
      stop: stop
    };
  }

  return Animation;

}());
//# sourceMappingURL=animation.js.map
