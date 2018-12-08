// 使用函数链实现职责链模式

const order500 = (orderType, pay, stock) => {
  if (orderType === 1 && pay) {
    return console.log('使用优惠价购买，获得100元购物津贴');
  }
  return 'next';
};

const order200 = (orderType, pay, stock) => {
  if (orderType === 2 && pay) {
    return console.log('使用优惠价购买，获得50元购物津贴');
  }
  return 'next';
};

const orderNormal = (orderType, pay, stock) => {
  if (stock > 0) {
    return console.log('普通购买');
  }
  return console.log('普通购买，库存不足');
};

// eslint-disable-next-line no-extend-native
Function.prototype.after = function (fn) {
  const self = this;
  return function (...args) {
    const ret = self.apply(this, args);
    if (ret === 'next') {
      return fn.apply(this, args);
    }
    return ret;
  };
};
const order = order500.after(order200).after(orderNormal);
order(1, true, 1);
