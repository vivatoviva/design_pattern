
function isFunction(fun) {
  return Object.prototype.toString.call(fun) === '[object Function]'
}

class Promise {
  constructor(fun) {
    if (!isFunction(fun)) {
      throw new TypeError(`Promise resolver ${fun} is not a function`);
    }
    this.fun = fun;
    this.state = 'pending'; // pending fulfilled rejected
    this.value = null;
    this.resolveList = [];
    this.rejectList = [];
    try {
      this.fun(this.resolve.bind(this), this.reject.bind(this));
    } catch(e) {
      this.reject(e);
    }
  }

  resolve(value) {
    if (this.state === 'pending') {
      this.state = 'fulfilled';
      this.value = value;
    }
    // 调用注册的回调函数
    this.resolveList.map(fun => {
      fun(value);
    })
  }

  reject(value) {
    if (this.state === 'pending') {
      this.state = 'rejected';
      this.value = value;
    }
    // 调用注册的回调函数
    this.rejectList.map(fun => {
      fun(value);
    })
  }

  then(onFulfilled, onRejected) {
    // 分两种情况，一种是状态已经改变，另一种是状态未改变
    const that = this;
    // fulfilled 状态
    if (this.state === 'fulfilled') {
      return new Promise((resolve, reject) => {
        try {
          const data  = isFunction(onFulfilled) ? onFulfilled(that.value) : that.value;
          if (data instanceof Promise) {
            // 如何函数返回一个promise，将当前Promise状态委托给返回的Promise
            return data.then(resolve, reject);
          }
          resolve(data);
        } catch(e) {
          reject(e);
        }
      })
    }
    // rejected 状态
    if(this.state === 'rejected') {
      return new Promise((resovle, reject) => {
        try {
          if (!isFunction(onRejected)) {
            // 不是函数直接传递错误
            return reject(that.value);
          }
          const data = onRejected(that.value);
          if (data instanceof Promise) {
            return data.then(resovle, reject);
          }
          resovle(data);
        } catch(e) {
          reject(e);
        }
      });
    }
    // pending状态
    if (this.state === 'pending') {
      return new Promise((resolve, reject) => {
        // 处理第一个参数
        if (isFunction(onFulfilled)) {
          that.resolveList.push((value) => {
            try {
              const data  = isFunction(onFulfilled) ? onFulfilled(value) : value;
              if (data instanceof Promise) {
                return data.then(resolve, reject);
              }
              resolve(data);
            } catch(e) {
              reject(e);
            }
          });
        } else {
          that.resolveList.push((value) => {
            resolve(value);
          })
        }
        // 处理第二个参数
        if (isFunction(onRejected)) {
          that.rejectList.push((value) => {
            try {
              const data = onRejected(value);
              if (data instanceof Promise) {
                return data.then(resovle, reject);
              }
              resolve(data);
            } catch(e) {
              reject(e);
            }
          })
        } else {
          this.rejectList.push((value) => {
            reject(value);
          })
        }
      })
    }
    // 如果this.state 不是这三种状态之一，报差提醒
    throw new Error('please check function')
  }

  static catch(fun) {
    return this.then(null, fun);
  }
}
