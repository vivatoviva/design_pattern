// 使用AOP函数来给函数添加功能，因为在js中函数也是一种对象，通过这两个方法可以代理函数的相关功能

Function.prototype.after = function(afterfn) {
  const self = this;
  return function () {
    const ret = self.apply(self, arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
}

Function.prototype.before = function (beforefn) {
  const self = this;
  return function() {
    beforefn.apply(this, arguments);
    return self.apply(this, arguments);
  }
}

// 上面两种方法会污染函数原型链，我们可以通过函数来实现相关包装方法
const before = (fn, beforefn) => {
  return function() {
    beforefn.apply(this,arguments);
    return fn.apply(this, arguments);
  };
};

const after = (fn, afterfn) => {
  return function () {
    const ret = fn.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  };
};
// 通常用于 日志记录、性能统计、安全控制、事务处理、异常处理
