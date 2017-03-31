'use strict';

const html = document.documentElement;
const list = document.getElementById('list');
const items = document.getElementsByTagName('li');
const master = items[0];

const emojiCodes = '😁,😂,😃,😄,😠,😆,😉,😊,😋,😌,😏,😜';
const emojis = emojiCodes.split(',');
const emojiTotal = emojis.length;

const cellsTotal = list.offsetWidth / master.offsetWidth * list.offsetHeight / master.offsetHeight;

let targetItem;
let frameCount = 0;

// Show in order
const show = Animation((t) => {
  const currentTotal = items.length;

  const item = items[currentTotal - 1];
  const seed = Math.floor(Math.random() * emojiTotal);

  const clone = master.cloneNode(true);
  const emoji = emojis[seed];

  list.appendChild(clone);
  item.setAttribute('data-content', emoji);

  if (currentTotal >= cellsTotal) {
    show.stop();
  }
});

const loop = Animation((t) => {
  if (t % 5 === 0) {
    const emoji = emojis[frameCount];

    targetItem.setAttribute('data-content', emoji);
    frameCount += 1;
  }

  if (frameCount >= emojiTotal) {
    loop.stop();
    frameCount = 0;
  }
});

// Track mouse position
const trak = Animation(() => {
  loop.play();
  trak.stop();
});

if (window !== window.top) {
  html.className = 'is-iframe';
}

window.addEventListener('mousemove', function _onMouseMove(e) {
  if (!e.target.getAttribute('data-content')) {
    return;
  }

  targetItem = e.target;
  trak.start();
});

window.addEventListener('load', function _onLoad() {
  show.start();
});

