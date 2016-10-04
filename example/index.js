'use strict';

var html = document.documentElement;

var host = document.getElementById('figure');
var list = document.getElementById('canvas');
var items = document.getElementsByTagName('li');
var buttons = document.getElementsByTagName('input');

var height = list.offsetHeight;
var width = list.offsetWidth;
var step = Math.max(items[0].offsetWidth, items[0].offsetHeight);

var target;
var frameId;
var isTicking = false;

var animation = new Animation(function _onEachFrame(t) {
  if (!isTicking) {
    for (var i = 0, total = buttons.length; i < total; i += 1) {
      var current = buttons[i];

      if (target === current || target === current.parentNode) {
        current.checked = true;
      } else {
        current.checked = false;
      }
    }
  }

  isTicking = true;
});

html.className = 'html';

if (window !== window.top) {
  html.className += ' is-iframe';
}

for (var i = 0, total = (width * height / step) - 1; i < total; i += 1) {
  list.appendChild(items[0].cloneNode(true));
}

window.addEventListener('mousemove', function _onMouseMove(e) {
  if (!frameId) {
    frameId = animation.start();
  }

  target = e.target;
  isTicking = false;
});

