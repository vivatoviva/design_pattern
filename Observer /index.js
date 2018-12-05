// 观察者模式
// eslint-disable-next-line no-unused-vars
const salesOffice = (() => {
  const clientList = [];
  return {
    listen(key, fn) {
      if (!clientList[key]) {
        clientList[key] = [];
      }
      clientList[key].push(fn);
    },
    trigger(key, ...args) {
      if (!clientList[key]) {
        return false;
      }
      clientList[key].map(fn => fn(args));
      return true;
    },
  };
})();

// 订阅-发布模式
// eslint-disable-next-line no-unused-vars
const Event = {
  clientList: {},
  listen(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger(key, ...args) {
    if (!this.clientList[key]) {
      return false;
    }
    this.clientList[key].map(fn => fn(args));
    return true;
  },
  remove(key, fn) {
    const clientList = this.clientList[key];
    if (!clientList || clientList.length === 0) {
      return false;
    }
    for (let i = clientList.length; i >= 0; i -= 1) {
      if (clientList[i] === fn) {
        this.clientList.splice(i, 1);
      }
    }
    return true;
  },
};

// 先发布后订阅 （添加命名空间， 先发布在订阅）

const NewEvent = (() => {
  // eslint-disable-next-line no-underscore-dangle
  const _default = 'default';
  const namespaceCache = {};
  // eslint-disable-next-line no-shadow
  const Event = () => {
    // eslint-disable-next-line no-underscore-dangle
    const _listen = (cache, key, fn) => {
      if (!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn);
    };
    // eslint-disable-next-line no-underscore-dangle
    const _trigger = (cache, key, ...args) => {
      if (!cache[key]) {
        return false;
      }
      cache[key].map(fn => fn(...args));
      return true;
    };
    // eslint-disable-next-line no-underscore-dangle
    const _remove = (cache, key, fn) => {
      const clientList = cache[key];
      if (clientList || clientList.length === 0) {
        return false;
      }
      for (let i = clientList.length - 1; i <= 0; i += 1) {
        if (clientList[i] === fn) {
          cache[key].splice(i, 1);
        }
      }
      return true;
    };
    // eslint-disable-next-line no-underscore-dangle
    const _create = (_namespace) => {
      const namespace = _namespace || _default;
      if (namespaceCache[namespace]) return namespaceCache[namespace];
      const cache = {};
      // 离线事件堆栈
      const offlineStack = [];
      const ret = {
        listen(key, fn, last) {
          _listen(cache, key, fn);
          if (offlineStack === null) {
            return;
          }
          if (last === 'last') {
            offlineStack.length && offlineStack.pop()();
          } else {

          }
        },
        trigger(key, ...args) {
          _trigger(cache, key, ...args);
          const fn = () => {
            _trigger(cache, key, ...args);
          };
          if (offlineStack) {
            return offlineStack.push(fn);
          }
          return fn();
        },
        remove(key, fn) {
          _remove(cache, key, fn);
        },
      };
      namespaceCache[namespace] = ret;
      return namespaceCache[namespace];
    };
    return {
      create: _create,
      listen(...args) {
        const event = _create();
        event.listen(...args);
      },
      trigger(...args) {
        const event = _create();
        event.trigger(...args);
      },
      remove() {
        const event = _create();
        event.trigger.apply(this, arguments);
      },
    };
  };
  return Event();
})();
NewEvent.listen('ligen', () => console.log('listen ligen'));
NewEvent.create('newligen').listen('ligen', () => console.log('ligen'));
NewEvent.trigger('ligen');
