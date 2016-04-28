(function(window, document, undefined) {
  'use strict';

  var Animation = window.animation;

  // TODO: Add up down classes

  var edge = 40;
  var scrollY = 0;

  var body = document.body;
  var html = document.documentElement;
  var wrap = document.querySelector('.wrap');
  var ball = wrap.cloneNode(false);

  var loop = new Animation(function _onTick(now) {
    var cutoff = window.innerHeight * 0.25;

    if (scrollY <= edge || scrollY >= window.innerHeight - edge) {
      ball.classList.add('shrink');
    } else {
      ball.classList.remove('shrink');
    }

    if (scrollY >= cutoff) {
      ball.classList.add('trip');
    } else {
      ball.classList.remove('trip');
    }

    if (scrollY >= cutoff * 3) {
      ball.classList.add('roll');
    } else {
      ball.classList.remove('roll');
    }

    loop.stop();
  });

  wrap.appendChild(ball);
  ball.className = 'ball shrink';

  window.addEventListener('load', function _onLoad(e) {
    html.className = 'html';
  });

  window.addEventListener('scroll', function _onScroll(e) {
    scrollY = window.scrollY;

    loop.start();
  }, false);
})(window, document);
