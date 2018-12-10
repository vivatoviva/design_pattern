const StateFactory = (() => {
  const State = function() {}
  State.prototype.clickHander1 = function() {
    throw new Error('重写相关方法')
  }

  State.prototype.clickHander2 = function() {
    throw new Error('重写相关方法')
  }

  return function (params) {
    const F = function () {};
    F.prototype = { ...F.prototype, ...new State(), ...params };
    return F;
  };
})();
