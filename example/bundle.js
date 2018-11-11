(function () {
  'use strict';

  // # Animation
  // RAF loop toggle

  const createLoop = (tick) => {
    if (tick === undefined || typeof tick !== 'function') {
      throw TypeError('Missing callback')
    }

    // Schedule
    const next = fn => window.requestAnimationFrame(fn);

    // Track progress
    let id;

    // On each frame
    const loop = (elapsed) => {
      tick(id, elapsed);

      // Skip if idle
      if (id) {
        id = next(loop);
      }
    };

    // Turn off if running
    const stop = () => {
      id = id && window.cancelAnimationFrame(id);

      return id
    };

    // Make sure these don't stack up
    const play = () => {
      id = id || next(loop);

      return id
    };

    return { play, stop, start: play, pause: stop }
  };

  const TAU = Math.PI * 2;
  const deg = TAU / 360;

  // Adapted from Foggy Tree by Chris Coyne,
  // http://www.contextfreeart.org/gallery/view.php?id=4
  /* eslint no-param-reassign: 1 */
  const tree = (ends) => {
    const jeez = { a: deg, b: deg * 40 };
    const data = [];

    const next = (x1, y1, size, turn, tick = 0) => {
      if (size > 1) {
        const forkMaybe = Math.random() < ends[tick];

        let x2 = Math.cos(turn);
        let y2 = Math.sin(turn);

        data.push({ x: x1, y: y1, r: size });

        if (forkMaybe) {
          const tock = (tick + 1) % ends.length;

          x2 += x1;
          y2 += y1;

          next(x2, y2, size * 0.9, turn + jeez.a, tock);
          next(x2, y2, size * 0.6, turn + jeez.b, tick);
          next(x2, y2, size * 0.5, turn - jeez.b, tock);
        } else {
          const from = jeez.a;
          const head = tick === 0 % 2 ? turn - from : turn + from;

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

  const seed = () => {
    const ends = [0.05, 0.1];
    const grow = tree(ends);
    const data = grow(0, 0, 9, deg * 270);

    return data
  };

  const canvas = document.querySelector('canvas');
  const target = canvas.getContext('2d');

  const { width: w, height: h } = canvas;

  target.translate(w * 0.5, h - 4.5);

  let points = seed();

  createLoop(() => {
    if (!points.length) {
      points = seed();
    }

    const { x, y, r } = points.shift();

    target.beginPath();
    target.arc(x, y, r * 0.5, 0, TAU);
    target.closePath();
    target.fill();
  }).start();

  document.addEventListener('click', () => {
    target.clearRect(-w * 0.5, -h, w, h);

    // Start again
    points.length = 0;
  });

}());
