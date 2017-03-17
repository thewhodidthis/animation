'use strict';

var html = document.documentElement;

var list = document.getElementById('list');
var items = document.getElementsByTagName('li');
var master = items[0];

var emojiCodes = '😁,😂,😃,😄,😠,😆,😉,😊,😋,😌,😏,😜';
var emojis = emojiCodes.split(',');
var emojiTotal = emojis.length;

var cellsTotal = list.offsetWidth / master.offsetWidth * list.offsetHeight / master.offsetHeight;

var targetItem;
var frameCount = 0;
var framesPast = 0;

// Show in order
var init = Animation(function _initFrame(t) {
  var currentTotal = items.length;

  var item = items[currentTotal - 1];
  var seed = Math.floor(Math.random() * emojiTotal);

  var clone = master.cloneNode(true);
  var emoji = emojis[seed];

  list.appendChild(clone);
  item.setAttribute('data-content', emoji);

  if (currentTotal >= cellsTotal) {
    init.stop();
  }
});

var loop = Animation(function _loopFrame(t) {
  if (framesPast % 5 === 0) {
    var emoji = emojis[frameCount];

    targetItem.setAttribute('data-content', emoji);
    frameCount += 1;
  }

  if (frameCount >= emojiTotal) {
    loop.stop();
    frameCount = 0;
  }

  framesPast += 1;
});

// Track mouse position
var track = Animation(function _trackFrame(t) {
  loop.start();
  track.stop();
});

if (window !== window.top) {
  html.className = 'is-iframe';
}

window.addEventListener('mousemove', function _onMouseMove(e) {
  if (!e.target.getAttribute('data-content')) {
    return;
  }

  targetItem = e.target;
  track.start();
});

window.addEventListener('load', function _onLoad() {
  init.start();
});

