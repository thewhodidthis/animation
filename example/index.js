(function () {
'use strict';

// # Animation
// rAF loop toggle

var createLoop$1 = function createLoop(callback) {
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

var list = document.querySelector('ul');
var bits = document.getElementsByTagName('li');

var emojiCodes = '😁,😂,😃,😄,😠,😆,😉,😊,😋,😌,😏,😜';
var emoji = emojiCodes.split(',');
var emojiTotal = emoji.length;
var cellsTotal = 60;

// Show in order
var setup = createLoop$1(function () {
  var currentTotal = bits.length;

  var item = bits[currentTotal - 1];
  var seed = Math.floor(Math.random() * emojiTotal);

  item.setAttribute('data-content', emoji[seed]);
  list.appendChild(item.cloneNode(true));

  if (currentTotal >= cellsTotal - 1) {
    setup.stop();
  }
});

var target = void 0;

var hoops = createLoop$1(function (frame) {
  if (frame % 5 === 0) {
    target.setAttribute('data-content', emoji[frame % emojiTotal]);
  }
});

// Track mouse position
var track = createLoop$1(function () {
  hoops.play();
  track.stop();
});

list.addEventListener('mousemove', function (e) {
  if (!e.target.getAttribute('data-content') || target !== e.target) {
    hoops.stop();
  } else {
    track.play();
  }

  target = e.target;
});

list.addEventListener('mouseleave', function () {
  hoops.stop();
  track.stop();
});

window.addEventListener('load', setup.start);

}());
