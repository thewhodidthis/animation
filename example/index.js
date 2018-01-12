(function () {
'use strict';

// # Animation
// RAF loop toggle

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

var TAU = Math.PI * 2;
var deg = TAU / 360;

// Adapted from Foggy Tree by Chris Coyne,
// http://www.contextfreeart.org/gallery/view.php?id=4
/* eslint no-param-reassign: 1 */
var tree = function (ends) {
  var jeez = { a: deg, b: deg * 40 };
  var data = [];

  var next = function (x1, y1, size, turn, tick) {
    if ( tick === void 0 ) tick = 0;

    if (size > 1) {
      var forkMaybe = Math.random() < ends[tick];

      var x2 = Math.cos(turn);
      var y2 = Math.sin(turn);

      data.push({ x: x1, y: y1, r: size });

      if (forkMaybe) {
        var tock = (tick + 1) % ends.length;

        x2 += x1;
        y2 += y1;

        next(x2, y2, size * 0.9, turn + jeez.a, tock);
        next(x2, y2, size * 0.6, turn + jeez.b, tick);
        next(x2, y2, size * 0.5, turn - jeez.b, tock);
      } else {
        var from = jeez.a;
        var head = tick === 0 % 2 ? turn - from : turn + from;

        x2 *= size;
        y2 *= size;

        x2 += x1;
        y2 += y1;

        next(x2, y2, size * 0.98, head, tick);
      }
    }

    return data
  };

  return next
};

var seed = function () {
  var ends = [0.05, 0.1];
  var grow = tree(ends);
  var data = grow(0, 0, 9, deg * 270);

  return data
};

var canvas = document.querySelector('canvas');
var target = canvas.getContext('2d');

var w = canvas.width;
var h = canvas.height;

target.fillStyle = 'white';
target.translate(w * 0.5, h);

var points = seed();

createLoop(function () {
  if (!points.length) {
    points = seed();
  }

  var ref = points.shift();
  var x = ref.x;
  var y = ref.y;
  var r = ref.r;

  target.beginPath();
  target.arc(x, y, r * 0.5, 0, TAU);
  target.closePath();
  target.fill();
}).start();

document.addEventListener('click', function () {
  target.clearRect(-w * 0.5, -h, w, h);

  // Start again
  points.length = 0;
});

}());

