import Animation from '../index.es';

const list = document.getElementById('list');
const items = document.getElementsByTagName('li');
const master = items[0];

const emojiCodes = '😁,😂,😃,😄,😠,😆,😉,😊,😋,😌,😏,😜';
const emoji = emojiCodes.split(',');
const emojiTotal = emoji.length;
const cellsTotal = 50;

// Show in order
const setup = Animation(() => {
  const currentTotal = items.length;

  const item = items[currentTotal - 1];
  const seed = Math.floor(Math.random() * emojiTotal);

  item.setAttribute('data-content', emoji[seed]);
  list.appendChild(master.cloneNode(true));

  if (currentTotal >= cellsTotal) {
    setup.stop();
  }
});

let target;

const hoops = Animation((frame) => {
  if (frame % 5 === 0) {
    target.setAttribute('data-content', emoji[frame % emojiTotal]);
  }
});

// Track mouse position
const track = Animation(() => {
  hoops.play();
  track.stop();
});

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe');
}

list.addEventListener('mousemove', (e) => {
  if (!e.target.getAttribute('data-content') || target !== e.target) {
    hoops.stop();
  } else {
    track.play();
  }

  target = e.target;
});

list.addEventListener('mouseleave', () => {
  hoops.stop();
  track.stop();
});

window.addEventListener('load', setup.start);
