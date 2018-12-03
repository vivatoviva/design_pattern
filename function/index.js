// currying
const cost = (() => {
  let args = [];
  return (...params) => {
    const length = params.length;
    if (!length) {
      return args.reduce((prev, current) => prev + current, 0);
    }
    args = args.concat(params);
  };
})();
cost(10);
cost(5);
console.log(cost());

// uncurrying

Function.prototype.uncurrying = function () {
  const self = this; // 指向一个函数
  return function (obj, ...args) {
    return self.apply(obj, args);
  };
};

const push = Array.prototype.push.uncurrying();
(function () {
  push(arguments, 5);
  console.log(arguments);
}(1,2,3,4));

// 节流函数
const throttle = (fun, interval) => {
  let canrun = true;
  return function (...params) {
    if (!canrun) {
      return;
    }
    canrun = false;
    setTimeout(() => {
      fun(...params);
      canrun = true;
    }, interval);
  };
};

// 分时函数
const timeChunk = (ary, fn, count) => {
  let t;

  const start = () => {
    for (let i = 0; i < Math.min(count || 1, ary.length); i += 1) {
      const param = ary.shift();
      fn(param);
    }
  };

  const invoke = () => {
    t = setInterval(() => {
      if (ary.length === 0) {
        clearInterval(t);
        start();
      }
    }, 200);
  };

  return invoke;
};

// 惰性加载函数

let addEvent = (elem, type, handler) => {
  if (window.addEventListener) {
    addEvent = function (elem, type, handler) {
      window.addEventListener(elem, type, handler);
    };
  } else {
    addEvent = function (elem, type, handler) {
      window.addEvent(elem, type, handler);
    };
  }
  addEvent(elem, type, handler);
};
