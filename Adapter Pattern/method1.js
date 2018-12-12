Function.prototype.after = function(afterFun) {
  const self = this;
  return function () {
    const result = self.apply(this, arguments);
    afterFun.apply(this, arguments);
    return result;
  }
}