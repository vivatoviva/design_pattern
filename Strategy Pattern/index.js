// 实现方式1
// const strategies = {
//   S(salary) {
//     return salary * 4;
//   },
//   A(salary) {
//     return salary * 3;
//   },
//   B(salary) {
//     return salary * 2;
//   },
// };

// const calculateBonus = (level, salary) => {
//   return strategies[level](salary);
// };
// console.log(calculateBonus('S', 100));
// console.log(calculateBonus('A', 100));
// console.log(calculateBonus('B', 100));

// 实现方式2( 实现表单验证 )
const strategies = {
  isNonEmpty(value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength(value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile(value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  },
};

const Valudator = function () {
  this.cache = [];
};

Valudator.prototype.add = function (dom, roules) {
  for (let i = 0, rule; i < roules.length; i++) {
    rule = roules[i];
    this.cache.push(() => {
      const value = dom.value;
      const strategyArr = rule.strategy.split(':');
      strategyArr.push(rule.errorMsg);
      const strategy = strategyArr.shift();
      strategies[strategy].apply(dom, strategyArr);
    });
  }
};

Valudator.prototype.start = function () {
  for (let i = 0, len = this.cache.length; i < len; i++) {
    const errorMsg = this.cache[i]();
    if (errorMsg) {
      return errorMsg;
    }
  }
};

const registerForm = document.getElementById('form');
const validataFun = function() {
  const validator = new Valudator();
  validator.add(registerForm.userName, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名称不能为空',
  }, {
    strategy: 'minLength:6',
    errorMsg: '用户名长度不能小于6',
  }]);
  return validator.start();
};
