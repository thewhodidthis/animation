'use strict';

var html = document.documentElement;

var list = document.getElementById('canvas');
var items = document.getElementsByTagName('li');
var master = items[0];

var emojiCodes = '😁,😂,😃,😄,😠,😆,😉,😊,😋,😌,😏,😜';
var emojis = emojiCodes.split(',');
var emojiTotal = emojis.length;

var targetItem;
var maxItems = list.offsetWidth / items[0].offsetWidth * list.offsetHeight / items[0].offsetHeight;

var frameCount = 0;
var framesPast = 0;

// Show in order
var init = new Animation(function _initFrame(t) {
  var currentTotal = items.length;

  var item = items[currentTotal - 1];
  var clone = master.cloneNode(true);

  var seed = Math.floor(Math.random() * emojiTotal);
  var emoji = emojis[seed];

  list.appendChild(clone);
  item.setAttribute('data-content', emoji);

  if (currentTotal >= maxItems) {
    init.stop();
  }
})

var loop = new Animation(function _loopFrame(t) {
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
var track = new Animation(function _trackFrame(t) {
  loop.start();
  track.stop();
});

html.className = 'html';

if (window !== window.top) {
  html.className += ' is-iframe';
}

window.addEventListener('load', function _onLoad() {
  init.start();
});

window.addEventListener('mousemove', function _onMouseMove(e) {
  targetItem = e.target;

  track.start();
});

