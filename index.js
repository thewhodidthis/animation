'use strict';

function Animation(fn) {
  var frameId;
  var _onTick = fn;

  var _tick = function (fn) {
    frameId = window.requestAnimationFrame(fn);
  };

  var _loop = function (now) {
    _onTick(now);

    // Skip when turned off
    if (frameId) {
      _tick(_loop);
    }
  };

  var start = function () {

    // Make sure these don't stack up
    if (!frameId) {
      _tick(_loop);
    }

    return this;
  };

  var stop = function () {
    if (frameId) {

      // Turn off, falsify frameId
      frameId = window.cancelAnimationFrame(frameId);
    }

    return this;
  };

  return {
    start: start,
    stop: stop
  };
}

module.exports = Animation;
