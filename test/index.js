const test = require('tape');
const Animation = require('../');

// Add favicon
const linkTag = document.createElement('link');

linkTag.rel = 'shortcut icon';
linkTag.href = 'data:;base64,iVBORw0KGgo=';

document.head.appendChild(linkTag);

test('will throw sans callback', (t) => {
  t.throws(Animation, Error);
  t.end();
});

test('will fake new', (t) => {
  const animation = new Animation(Function);

  t.ok(animation);
  t.end();
});

test('will avoid stacking', (t) => {
  const animation = Animation(Function);
  const id = animation.start();

  t.doesNotThrow(animation.start, id);

  t.equals(animation.start(), id, 'frame id hasn\'t changed');
  t.equals(animation.start(), id, 'frame id hasn\'t changed');
  t.equals(animation.start(), id, 'frame id hasn\'t changed');

  t.notOk(animation.stop(), 'stop');
  t.end();
});

