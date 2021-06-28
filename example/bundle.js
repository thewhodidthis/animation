(() => {
  // ../main.js
  var createLoop = (callback) => {
    if (callback === void 0 || typeof callback !== "function") {
      throw TypeError("Missing callback");
    }
    const scheduleRequest = (fn) => window.requestAnimationFrame(fn);
    let requestId;
    const loop = (elapsed) => {
      callback(elapsed, requestId);
      if (requestId) {
        requestId = scheduleRequest(loop);
      }
    };
    const play = () => {
      requestId = requestId || scheduleRequest(loop);
      return requestId;
    };
    const stop = () => {
      requestId = requestId && window.cancelAnimationFrame(requestId);
      return requestId;
    };
    return { start: play, stop, play, pause: stop };
  };
  var main_default = createLoop;

  // index.js
  var TAU = Math.PI * 2;
  var DEG = TAU / 360;
  var canvas = document.querySelector("canvas");
  var { width: w, height: h } = canvas;
  var target = canvas.getContext("2d");
  target.translate(w * 0.5, h - 4.5);
  var tree = createTree();
  var makePoints = () => tree(0, 0, 9, 270 * DEG);
  var points = [];
  main_default(() => {
    if (points.length === 0) {
      Array.prototype.push.apply(points, makePoints());
    }
    const { x, y, r } = points.shift();
    target.beginPath();
    target.arc(x, y, r * 0.5, 0, TAU);
    target.closePath();
    target.fill();
  }).start();
  canvas.addEventListener("click", () => {
    target.clearRect(-w * 0.5, -h, w, h);
    points.length = 0;
  });
  function createTree(lottery = [0.05, 0.1], angles = { a: DEG, b: 40 * DEG }) {
    const data = [];
    const generator = (x1, y1, radius, angle, lotteryIndex = 0) => {
      if (radius > 1) {
        const forkMaybe = Math.random() < lottery[lotteryIndex];
        let x2 = Math.cos(angle);
        let y2 = Math.sin(angle);
        data.push({ x: x1, y: y1, r: radius });
        if (forkMaybe) {
          const nextLotteryIndex = (lotteryIndex + 1) % lottery.length;
          x2 += x1;
          y2 += y1;
          generator(x2, y2, radius * 0.9, angle + angles.a, nextLotteryIndex);
          generator(x2, y2, radius * 0.6, angle + angles.b, lotteryIndex);
          generator(x2, y2, radius * 0.5, angle - angles.b, nextLotteryIndex);
        } else {
          const nextAngle = lotteryIndex === 0 % 2 ? angle - angles.a : angle + angles.a;
          x2 *= radius;
          y2 *= radius;
          x2 += x1;
          y2 += y1;
          generator(x2, y2, radius * 0.98, nextAngle, lotteryIndex);
        }
      }
      return data;
    };
    return generator;
  }
})();
