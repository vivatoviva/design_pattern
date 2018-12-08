class Chain {
  constructor(fn) {
    this.fn = fn;
    this.successor = null;
  }

  setNextSuccessor(successor) {
    this.successor = successor;
    return successor;
  }

  passRequest(...args) {
    const ret = this.fn.apply(null, args);
    const { successor } = this;
    if (ret === 'next') {
      return successor && successor.passRequest.apply(this.successor, args);
    }
    return ret;
  }

  // 用于处理异步请求
  next(...args) {
    const { successor } = this;
    if (successor) {
      successor.passRequest.apply(this.successor, args);
    }
  }
}

const order500 = (orderType, pay, stock) => {
  if (orderType === 1 && pay) {
    return '使用优惠价购买，获得100元购物津贴';
  }
  return 'next';
};

const order200 = (orderType, pay, stock) => {
  if (orderType === 2 && pay) {
    return '使用优惠价购买，获得50元购物津贴';
  }
  return 'next';
};

const orderNormal = (orderType, pay, stock) => {
  if (stock > 0) {
    return '普通购买';
  }
  return '普通购买，库存不足';
};

const chain500 = new Chain(order500);
const chain200 = new Chain(order200);
const chainnormal = new Chain(orderNormal);

// 构建职责链
chain500.setNextSuccessor(chain200).setNextSuccessor(chainnormal);

console.log(chain500.passRequest(3, true, -1));
console.log(chain200.passRequest(2, false, 0));
// 和中间件模式进行对比；node中洋葱模型

